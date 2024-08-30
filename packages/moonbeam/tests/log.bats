#!/usr/bin/env bats

setup() {
  bats_load_library bats-support
  bats_load_library bats-assert

  DIR="$(cd "$(dirname "$BATS_TEST_FILENAME")" >/dev/null 2>&1 && pwd)"
  source "$DIR/../bin/log.sh"

  [ ! -f ${BATS_PARENT_TMPNAME}.skip ] || skip "skip remaining tests"
}

teardown() {
  [ -n "$BATS_TEST_COMPLETED" ] || touch ${BATS_PARENT_TMPNAME}.skip
}

@test "get_level_value returns correct values" {
  assert_equal "$(get_level_value QUIET)" "0"
  assert_equal "$(get_level_value INFO)" "1"
  assert_equal "$(get_level_value WARN)" "2"
  assert_equal "$(get_level_value DEBUG)" "3"
  assert_equal "$(get_level_value TRACE)" "4"
  assert_equal "$(get_level_value VERBOSE)" "5"
  assert_equal "$(get_level_value ERROR)" "6"
  assert_equal "$(get_level_value FATAL)" "7"
  assert_equal "$(get_level_value UNKNOWN)" "1"
}

@test "validate_and_set_log_level sets correct log levels" {
  validate_and_set_log_level "INFO"
  assert_equal "$LOG_LEVEL" "1"

  validate_and_set_log_level "DEBUG"
  assert_equal "$LOG_LEVEL" "3"

  validate_and_set_log_level "INVALID"
  assert_equal "$LOG_LEVEL" "5"
}

@test "log function respects LOG_LEVEL" {
  LOG_LEVEL=1 # INFO
  run log "info" "Test info message"
  assert_success
  assert_output --partial "Test info message"

  LOG_LEVEL=1 # INFO
  run log "debug" "Test debug message"
  assert_success
  refute_output --partial "Test debug message"

  LOG_LEVEL=3 # DEBUG
  run log "debug" "Test debug message"
  assert_success
  assert_output --partial "Test debug message"
}

@test "error and fatal functions return non-zero exit code" {
  run error "Test error message"
  assert_failure
  assert_output --partial "Test error message"

  run fatal "Test fatal message"
  assert_failure
  assert_output --partial "Test fatal message"
}

# Edge case tests

@test "get_level_value handles lowercase input" {
  assert_equal "$(get_level_value quiet)" "0"
  assert_equal "$(get_level_value info)" "1"
  assert_equal "$(get_level_value ERROR)" "6"
}

@test "get_level_value handles mixed case input" {
  assert_equal "$(get_level_value QuIeT)" "0"
  assert_equal "$(get_level_value InFo)" "1"
  assert_equal "$(get_level_value eRrOr)" "6"
}

@test "validate_and_set_log_level handles edge cases" {
  validate_and_set_log_level ""
  assert_equal "$LOG_LEVEL" "5"

  validate_and_set_log_level "   "
  assert_equal "$LOG_LEVEL" "5"

  validate_and_set_log_level "debug "
  assert_equal "$LOG_LEVEL" "3"

  validate_and_set_log_level " INFO"
  assert_equal "$LOG_LEVEL" "1"
}

@test "log function handles empty messages" {
  run log "info" ""
  assert_failure

  run log "error" ""
  assert_failure
}

@test "log function handles messages with special characters" {
  run log "info" "Test message with * and $ and \""
  assert_success
  assert_output --partial "Test message with * and $ and \""
}

@test "log function handles multi-line messages" {
  run log "info" "Line 1
Line 2
Line 3"
  assert_success
  assert_output --partial "Line 1"
  assert_output --partial "Line 2"
  assert_output --partial "Line 3"
}

@test "log function behavior with LOG_LEVEL set to QUIET" {
  LOG_LEVEL=0 # QUIET
  run log "info" "This should not be logged"
  assert_success
  refute_output --partial "This should not be logged"

  run log "fatal" "This should be logged"
  assert_failure
  assert_output --partial "This should be logged"
}

@test "error and fatal functions handle empty messages" {
  run error ""
  assert_failure

  run fatal ""
  assert_failure
}

@test "validate_and_set_log_level handles numerical input" {
  validate_and_set_log_level "1"
  assert_equal "$LOG_LEVEL" "5" # Should default to VERBOSE

  validate_and_set_log_level "0"
  assert_equal "$LOG_LEVEL" "5" # Should default to VERBOSE
}
