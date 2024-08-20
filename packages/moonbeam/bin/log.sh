#!/usr/bin/env bash

# Log levels (ordered by severity)
LOG_LEVELS=(QUIET INFO WARN DEBUG TRACE VERBOSE ERROR FATAL)

# Default log level
LOG_LEVEL=1 # INFO

log() {
  local level="$1"
  shift
  local message="$*"

  # Check for empty message
  if [ -z "$message" ]; then
    error "Empty log message"
    return 1
  fi

  local level_value
  level_value=$(get_level_value "$level")

  # Early return if QUIET
  [ "$level_value" -eq 0 ] && return 0

  # Always log if level is greater than VERBOSE, otherwise respect LOG_LEVEL
  if [ "$level_value" -gt 5 ] || [ "$level_value" -le "$LOG_LEVEL" ]; then
    gum log --level "$level" "$message"
  fi
  # Return 1 for ERROR and FATAL levels
  if [ "$level_value" -ge 6 ]; then
    return 1
  fi
}

get_level_value() {
  local input_level="$1"
  input_level=$(echo "$input_level" | tr '[:lower:]' '[:upper:]')
  case "$input_level" in
  QUIET) echo 0 ;;
  INFO) echo 1 ;;
  WARN) echo 2 ;;
  DEBUG) echo 3 ;;
  TRACE) echo 4 ;;
  VERBOSE) echo 5 ;;
  ERROR) echo 6 ;;
  FATAL) echo 7 ;;
  *) echo 1 ;; # Default to INFO if not found
  esac
}

# Log level functions
info() { log "info" "$@"; }
warn() { log "warn" "$@"; }
debug() { log "debug" "$@"; }
trace() { log "trace" "$@"; }
verbose() { log "verbose" "$@"; }
error() {
  log "error" "$@"
  return 1
}
fatal() {
  log "fatal" "$@"
  exit 1
}

validate_and_set_log_level() {
  local input_level="$1"
  # Trim leading and trailing whitespace
  input_level=$(echo "$input_level" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')
  input_level=$(echo "$input_level" | tr '[:lower:]' '[:upper:]')
  case "$input_level" in
  QUIET | INFO | WARN | DEBUG | TRACE | VERBOSE)
    LOG_LEVEL=$(get_level_value "$input_level")
    debug "Log level set to: $input_level"
    ;;
  *)
    LOG_LEVEL=5 # VERBOSE
    warn "Invalid log level '$input_level'. Setting to VERBOSE. Valid levels are: QUIET, INFO, WARN, DEBUG, TRACE, VERBOSE"
    ;;
  esac
}
