#!/usr/bin/env -S nix shell nixpkgs#bash nixpkgs#gum -c bash

# Global variables
MOONLIGHT_PID=""
LOG_LEVEL="${LOG_LEVEL:-0}"

kill_process() {
  local pid="$1"

  if [[ -n "$pid" ]]; then
    kill -9 "$pid" 2>/dev/null
    wait "$pid" 2>/dev/null
  fi
}

create_fifo() {
  local fifo="/tmp/moonlight_output_$$.fifo"

  mkfifo "$fifo"
  echo "$fifo"
}

launch_moonlight() {
  local command="$1"
  local fifo="$2"

  info "Opening Moonlight stream"
  $command >"$fifo" 2>&1 &
  MOONLIGHT_PID=$!
}

monitor_moonlight_output() {
  local fifo="$1"

  while IFS= read -r line; do
    log_moonlight_output "$line"
    if check_for_disconnect "$line"; then
      return 1
    elif check_for_quit "$line"; then
      return 0
    fi
  done <"$fifo"

  return 1
}

log_moonlight_output() {
  local line="$1"

  if [ "$LOG_LEVEL" -ge 5 ]; then
    echo "$line"
  fi
}

build_moonlight_cmd() {
  local resolution=$1
  local fps=$2
  local bitrate=$3
  local host=$4
  local app=$5
  local extra=$6

  echo "moonlight --resolution $resolution --fps $fps --bitrate $bitrate $extra stream $host $app"
}

check_for_disconnect() {
  local line="$1"

  if [[ "$line" == *"Control stream received unexpected disconnect event"* ]]; then
    warn "Detected disconnect event. Restarting Moonlight stream."
    return 0
  fi
  return 1
}

check_for_quit() {
  local line="$1"

  if [[ "$line" == *"Quit event received"* ]]; then
    info "Quit event received. Stopping reconnection attempts."
    return 0
  fi
  return 1
}

cleanup_moonlight() {
  local fifo="$1"

  kill_process "$MOONLIGHT_PID"
  rm "$fifo"
  local exit_code=$?
  info "Moonlight stream closed with exit code $exit_code"
}

moonlight_session() {
  local command="$1"
  local reconnect="$2"
  local fifo

  info "$command"

  fifo=$(create_fifo)
  launch_moonlight "$command" "$fifo"
  monitor_moonlight_output "$fifo"
  local monitor_exit_code=$?
  cleanup_moonlight "$fifo"

  if [ "$reconnect" = true ] && [ $monitor_exit_code -ne 0 ]; then
    return 1 # Indicate that we should reconnect
  else
    return 0 # Indicate that we should exit
  fi
}

cleanup() {
  info "Termination signal received. Cleaning up and exiting."
  kill_process "$MOONLIGHT_PID"
  exit 0
}

trap cleanup INT TERM
