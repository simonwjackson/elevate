#!/usr/bin/env bash

# shellcheck disable=SC1091

doc="Game Launcher Script.

Usage:
  $(basename "$0") [options] [--] <command>...
  $(basename "$0") -h | --help

Options:
  -h, --help            Show this screen.
  -a, --after <cmd>     Command to run during cleanup (can be specified multiple times)
  -m, --meta <key=value>  Metadata to store (can be specified multiple times)
  -o, --output <file>   File to append the output of after commands
  -q, --quiet           Redirect all output to /tmp/game.log

Arguments:
  <command>...          Command to execute with its arguments
"

# Parse arguments
args=()
after_commands=()
meta_data=()
output_file=""
quiet=false
while [[ $# -gt 0 ]]; do
  case $1 in
  -h | --help)
    echo "$doc"
    exit 0
    ;;
  -a | --after)
    after_commands+=("$2")
    shift 2
    ;;
  -m | --meta)
    meta_data+=("$2")
    shift 2
    ;;
  -o | --output)
    output_file="$2"
    shift 2
    ;;
  -q | --quiet)
    quiet=true
    shift
    ;;
  --)
    shift
    break
    ;;
  *)
    args+=("$1")
    shift
    ;;
  esac
done

# The rest of the arguments are the command to run
command_to_run=("$@")

if [ ${#command_to_run[@]} -eq 0 ]; then
  echo "Error: No command specified" >&2
  echo "$doc"
  exit 1
fi

run_dir="$XDG_RUNTIME_DIR/elevate"
log_file="$XDG_RUNTIME_DIR/elevate.log"

check_instance() {
  if [[ -d "$run_dir" ]] && [[ -f "$run_dir/pid" ]]; then
    pid=$(cat "$run_dir/pid")
    if kill -0 "$pid" 2>/dev/null; then
      echo "Error: An instance of the game launcher is already running with PID $pid" >&2
      exit 1
    fi
  fi
  rm -rf "$run_dir"
}

create_run_dir() {
  mkdir -p "$run_dir"
}

write_metadata() {
  local pid=$1
  local run_dir=$2
  local fields=("ppid" "cmd" "start" "time")

  exe=$(readlink -f "/proc/$pid/exe")
  ppid=$(ps -p "$pid" -o "ppid=") >"$run_dir/ppid"
  cmd=$(ps -p "$pid" -o "cmd=") >"$run_dir/cmd"
  start=$(ps -p "$pid" -o "start=") >"$run_dir/start"
  time=$(ps -p "$pid" -o "time=") >"$run_dir/time"

  echo "$pid" >"$run_dir/pid"
  echo "$exe" >"$run_dir/exe"
  echo "$ppid" >"$run_dir/ppid"
  echo "$cmd" >"$run_dir/cmd"
  echo "$start" >"$run_dir/start"
  echo "$time" >"$run_dir/start"

  # Create info.json with all metadata
  jq -n \
    --arg pid "$pid" \
    --arg ppid "$ppid" \
    --arg exe "$exe" \
    --arg cmd "${command_to_run[*]}" \
    --arg start "$start" \
    --arg time "$time" \
    --argjson meta "$(printf '%s\n' "${meta_data[@]}" | jq -R 'split("=") | {(.[0]): .[1]}' | jq -s add)" \
    '{pid: $pid, ppid: $ppid, exe: $exe, cmd: $cmd, start: $start, time: $time, meta: $meta}' \
    >"$run_dir/info.json"
}

cleanup() {
  local exit_code=$?
  log_output "Performing cleanup..."

  # Run after commands
  for cmd in "${after_commands[@]}"; do
    if [ -n "$output_file" ]; then
      eval "$cmd" | tee -a "$output_file" | log_output
    else
      eval "$cmd" | log_output
    fi
  done

  rm -rf "$run_dir"
  log_output "Application closed. Cleaned up metadata."
  exit "$exit_code"
}

log_output() {
  if [ "$quiet" = true ]; then
    echo "$@" >>"$log_file"
  else
    echo "$@"
  fi
}

run_script() {
  log_output "Command to be executed:"
  log_output "${command_to_run[*]}"

  # Set up trap for cleanup
  trap cleanup EXIT SIGINT SIGTERM

  # Ensure run_dir exists
  create_run_dir

  # Prepare the environment variables
  # env_vars=(
  #   "WAYLAND_DISPLAY=$WAYLAND_DISPLAY"
  #   "XDG_RUNTIME_DIR=$XDG_RUNTIME_DIR"
  #   "DBUS_SESSION_BUS_ADDRESS=$DBUS_SESSION_BUS_ADDRESS"
  #   "DISPLAY=$DISPLAY" # Include this if you're also supporting X11 applications
  # )

  # if is_running_in_systemd; then
  # log_output "Running in systemd environment. Using systemd-run..."
  # systemd-run --user --collect --pty -p PAMName=sudo -p SendSIGHUP=yes \
  #   -E "DISPLAY=:0" \
  #   -E "WAYLAND_DISPLAY=$WAYLAND_DISPLAY" \
  #   -E "XDG_RUNTIME_DIR=$XDG_RUNTIME_DIR" \
  #   -E "DBUS_SESSION_BUS_ADDRESS=$DBUS_SESSION_BUS_ADDRESS" \
  #   "${command_to_run[@]}" &
  # else
  if [ "$quiet" = true ]; then
    "${command_to_run[@]}" >>"$log_file" 2>&1 &
  else
    "${command_to_run[@]}" &
  fi
  # fi

  local pid=$!

  write_metadata "$pid" "$run_dir"

  log_output "Application launched with PID $pid"
  log_output "Metadata stored in $run_dir"

  wait "$pid"
}

main() {
  check_instance
  create_run_dir
  run_script
}

main
