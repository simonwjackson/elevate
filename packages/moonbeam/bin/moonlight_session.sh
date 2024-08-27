#!/usr/bin/env -S nix shell nixpkgs#bash nixpkgs#gum -c bash

##
# @file moonlight_session.sh
# @brief A script to manage Moonlight streaming sessions with automatic optimization and reconnection.
# @author Unknown
# @version 1.0
#
# This script provides functionality to launch, monitor, and manage Moonlight streaming sessions.
# It includes features like automatic optimization of streaming settings, latency checking,
# and reconnection in case of disconnects.

## @var MOONLIGHT_PID
# @brief Global variable to store the process ID of the Moonlight stream
MOONLIGHT_PID=""

## @var LOG_LEVEL
# @brief Global variable to set the logging verbosity
LOG_LEVEL="${LOG_LEVEL:-0}"

##
# @brief Kills a process given its PID
# @param $1 The process ID to kill
#
kill_process() {
  local pid="$1"

  if [[ -n "$pid" ]]; then
    kill -9 "$pid" 2>/dev/null
    wait "$pid" 2>/dev/null
  fi
}

##
# @brief Creates a named pipe (FIFO) for inter-process communication
# @return The path to the created FIFO
#
create_fifo() {
  local fifo="/tmp/moonlight_output_$$.fifo"

  mkfifo "$fifo"
  echo "$fifo"
}

##
# @brief Launches a Moonlight stream
# @param $1 The Moonlight command to execute
# @param $2 The FIFO to redirect output to
#
launch_moonlight() {
  local command="$1"
  local fifo="$2"

  info "Opening Moonlight stream"
  $command >"$fifo" 2>&1 &
  MOONLIGHT_PID=$!
}

##
# @brief Monitors the output of the Moonlight stream
# @param $1 The FIFO to read from
# @return 0 if quit event received, 1 if disconnect detected or other error
#
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

##
# @brief Logs Moonlight output based on the LOG_LEVEL
# @param $1 The line to log
#
log_moonlight_output() {
  local line="$1"

  if [ "$LOG_LEVEL" -ge 5 ]; then
    echo "$line"
  fi
}

##
# @brief Builds the Moonlight command with given parameters
# @param $1 Resolution
# @param $2 FPS
# @param $3 Bitrate
# @param $4 Host
# @param $5 App
# @param $6 Extra options
# @return The constructed Moonlight command
#
build_moonlight_cmd() {
  local resolution=$1
  local fps=$2
  local bitrate=$3
  local host=$4
  local app=$5
  local extra=$6

  echo "moonlight --resolution $resolution --fps $fps --bitrate $bitrate $extra stream $host $app"
}

##
# @brief Checks if a disconnect event has occurred
# @param $1 The line to check
# @return 0 if disconnect detected, 1 otherwise
#
check_for_disconnect() {
  local line="$1"

  if [[ "$line" == *"Control stream received unexpected disconnect event"* ]]; then
    warn "Detected disconnect event."
    return 0
  fi
  return 1
}

##
# @brief Checks if a quit event has occurred
# @param $1 The line to check
# @return 0 if quit event detected, 1 otherwise
#
check_for_quit() {
  local line="$1"

  if [[ "$line" == *"Quit event received"* ]]; then
    info "Quit event received. Stopping reconnection attempts."
    return 0
  fi
  return 1
}

##
# @brief Cleans up the Moonlight process and associated resources
# @param $1 The FIFO to remove
#
cleanup_moonlight() {
  local fifo="$1"

  kill_process "$MOONLIGHT_PID"
  rm "$fifo"
  local exit_code=$?
  info "Moonlight stream closed with exit code $exit_code"
}

##
# @brief Manages a single Moonlight session
# @param $1 The Moonlight command to execute
# @param $2 Boolean indicating whether to reconnect on disconnect
# @return 0 if session should end, 1 if reconnection is needed
#
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

##
# @brief Runs a Moonlight session with optimized settings and reconnection logic
# @param $1 Reference to the configuration associative array
# @return 0 on success, 1 on failure
#
run_moonlight_session() {
  local -n local_config=$1

  log info "Starting Moonlight stream"

  while true; do
    if ! new_latency=$(check_host_latency "${local_config[max_latency]}" "${local_config[host]}"); then
      error "Stream cancelled due to high latency."
      return 1
    fi

    new_available_bitrate=$(
      get_optimal_bitrate \
        "${local_config[max_bitrate]}" \
        "${local_config[max_resolution]}" \
        "${local_config[max_fps]}" \
        "${local_config[host]}"
    )

    debug "Calculating best settings..."
    if ! result=$(
      optimize_streaming_settings \
        "${local_config[min_fps]}" \
        "${local_config[max_fps]}" \
        "${local_config[min_resolution]}" \
        "${local_config[max_resolution]}" \
        "$new_available_bitrate" \
        "$new_latency" \
        "${local_config[priority]}" \
        "${local_config[resolution_steps]}"
    ); then
      error "optimize_streaming_settings: $result"
      return 1
    fi
    read -r best_resolution best_fps best_bitrate <<<"$result"

    moonlight_cmd=$(
      build_moonlight_cmd \
        "$best_resolution" \
        "$best_fps" \
        "$best_bitrate" \
        "${local_config[host]}" \
        "${local_config[app]}" \
        "${local_config[extra_moonlight_options]}"
    )

    present_config local_config "$new_latency" "$new_available_bitrate"

    debug "Command: $moonlight_cmd"

    if [[ "${local_config[dry_run]}" == "true" ]]; then
      info "Dry Mode: Exiting.."
      return 0
    fi

    if moonlight_session "$moonlight_cmd" "${local_config[reconnect]}"; then
      log info "Exiting."
      break
    fi

    if [ "${local_config[reconnect]}" = true ]; then
      log info "Reopening Moonlight stream. Press Ctrl+C to exit."
    else
      log info "Moonlight stream closed. Exiting."
      break
    fi
  done
}

##
# @brief Cleanup function to handle termination signals
#
cleanup() {
  info "Termination signal received. Cleaning up and exiting."
  kill_process "$MOONLIGHT_PID"
  exit 0
}

# Set up signal traps
trap cleanup INT TERM
