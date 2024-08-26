#!/usr/bin/env bash

##
# @file log.sh
# @brief A bash script for flexible logging with different levels.
# @author Original author unknown
# @date Last updated: August 25, 2024

## @brief Array of log levels ordered by severity
LOG_LEVELS=(QUIET INFO WARN DEBUG TRACE VERBOSE ERROR FATAL)

## @brief Default log level (1 = INFO)
LOG_LEVEL=1 # INFO

##
# @brief Main logging function
# @param level The log level (e.g., INFO, WARN, ERROR)
# @param message The message to log
# @return 0 on success, 1 on error or for ERROR/FATAL levels
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
    if [ "$level_value" -eq 4 ]; then
      gum style \
        "$(gum style --foreground 23 'TRACE') $*" >&2
    else
      gum log --level "$level" "$message"
    fi
  fi
  # Return 1 for ERROR and FATAL levels
  if [ "$level_value" -ge 6 ]; then
    return 1
  fi
}

##
# @brief Get the numeric value of a log level
# @param input_level The log level as a string
# @return The numeric value of the log level
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

## @fn info()
## @brief Log an INFO level message
## @param message The message to log
info() { log "info" "$@"; }

## @fn warn()
## @brief Log a WARN level message
## @param message The message to log
warn() { log "warn" "$@"; }

## @fn debug()
## @brief Log a DEBUG level message
## @param message The message to log
debug() { log "debug" "$@"; }

## @fn trace()
## @brief Log a TRACE level message
## @param message The message to log
trace() { log "trace" "$@"; }

## @fn verbose()
## @brief Log a VERBOSE level message
## @param message The message to log
verbose() { log "verbose" "$@"; }

## @fn error()
## @brief Log an ERROR level message
## @param message The message to log
## @return Always returns 1
error() {
  log "error" "$@"
  return 1
}

## @fn fatal()
## @brief Log a FATAL level message and exit the script
## @param message The message to log
## @return Never returns, exits with status 1
fatal() {
  log "fatal" "$@"
  exit 1
}

##
# @brief Validate and set the log level
# @param input_level The log level to set
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
