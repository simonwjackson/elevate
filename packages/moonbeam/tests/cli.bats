#!/usr/bin/env bats

setup() {
  bats_load_library bats-support
  bats_load_library bats-assert

  # # TODO: how to source this
  DIR="$(cd "$(dirname "$BATS_TEST_FILENAME")" >/dev/null 2>&1 && pwd)"
  # make executables in src/ visible to PATH
  # PATH="$DIR/../bin:$PATH"
  source "$DIR/../bin/moonbeam"
  source "$DIR/mocks/xrandr.sh"
  source "$DIR/mocks/iperf3.sh"
  source "$DIR/mocks/ping.sh"
  source "$DIR/mocks/moonlight.sh"

  # Create a temporary directory for our XDG paths
  export BATS_TMPDIR
  BATS_TMPDIR="$(mktemp -d)"

  # Set XDG base directories to our temporary location
  export XDG_DATA_HOME="${BATS_TMPDIR}/.local/share"
  export XDG_CONFIG_HOME="${BATS_TMPDIR}/.config"
  export XDG_CACHE_HOME="${BATS_TMPDIR}/.cache"
  export XDG_STATE_HOME="${BATS_TMPDIR}/.local/state"
  export XDG_RUNTIME_DIR="${BATS_TMPDIR}/run"

  # Create the directories
  mkdir -p "$XDG_DATA_HOME" "$XDG_CONFIG_HOME" "$XDG_CACHE_HOME" "$XDG_STATE_HOME" "$XDG_RUNTIME_DIR"
  [ ! -f "${BATS_PARENT_TMPNAME}.skip" ] || skip "skip remaining tests"

  measure_latency() { successful_measure_latency; }
}

teardown() {
  [ -n "$BATS_TEST_COMPLETED" ] || touch "${BATS_PARENT_TMPNAME}.skip"
}

# Mock for successful latency measurement
successful_measure_latency() {
  echo "1"
  return 0
}

# Mock for failed latency measurement
failed_measure_latency() {
  echo ""
  return 1
}

@test "no arguments" {
  moonlight() {
    return 0
  }

  run main
  assert_success
}

# === Command Line Argument Parsing ===

@test "parse_args: help option" {
  skip
  run parse_args --help
  assert_success
  assert_output --partial "Usage:"
}

@test "parse_args: stream command with missing arguments" {
  run parse_args stream
  assert_failure
  assert_output --partial "Missing required arguments: stream <host> <app>"
}

@test "parse_args: valid stream command" {
  run parse_args stream host app
  assert_success
}

# @test "parse_args: valid options" {
#   run parse_args --dry-run --bitrate 5000 --resolution 1920x1080 --fps 60 stream host app
#   assert_success
# }

@test "parse_args: invalid bitrate" {
  run parse_args --bitrate invalid stream host app
  assert_failure
  assert_output --partial "Bitrate must be a positive integer"

}

@test "parse_args: invalid resolution" {
  run parse_args --resolution invalid stream host app
  assert_failure
  assert_output --partial "Invalid resolution format for --resolution"
}

@test "parse_args: invalid fps" {
  run parse_args --fps invalid stream host app
  assert_failure
  assert_output --partial "FPS must be a positive integer"
}

@test "parse_args: conflicting resolution options" {
  run parse_args --resolution 1920x1080 --max-resolution 1280x720 stream host app
  assert_failure
  assert_output --partial "Cannot use --max-resolution with --resolution or shorthand resolution options."
}

@test "parse_args: shorthand resolution" {
  run parse_args --720 stream host app
  assert_success
}

# === Resolution Handling ===

@test "set_max_resolution: no resolution specified" {
  get_display_resolution() {
    echo "1920x1080"
  }

  run set_max_resolution false false false "1920x1080"
  assert_success
  assert_output "$(get_display_resolution)"
}

@test "set_max_resolution: specified resolution lower than system" {
  get_display_resolution() {
    echo "1920x1080"
  }

  run set_max_resolution true false false "1280x720"
  assert_success
  assert_output "1280x720"
}

@test "set_max_resolution: specified resolution higher than system" {
  get_display_resolution() {
    echo "1920x1080"
  }

  run set_max_resolution true false false "3840x2160"
  assert_success
  assert_output --partial "is higher than system resolution"
  assert_output --partial "$(get_display_resolution)"
}

# === FPS Handling ===

@test "set_max_fps: no fps specified" {
  get_display_refresh_rate() {
    echo "60"
  }

  run set_max_fps false 60
  assert_success
  assert_output "$(get_display_refresh_rate)"
}

@test "set_max_fps: specified fps lower than system" {
  get_display_refresh_rate() {
    echo "60"
  }

  run set_max_fps true 30
  assert_success
  assert_output "30"
}

@test "set_max_fps: specified fps higher than system" {
  get_display_refresh_rate() {
    echo "60"
  }

  run set_max_fps true 240
  assert_success
  assert_output --partial "is higher than system refresh rate"
  assert_output --partial "$(get_display_refresh_rate)"
}

# === Bitrate Calculation ===

@test "calculate_bitrate: no available bitrate" {
  run calculate_bitrate 0 "1920x1080" 60
  assert_success
  assert_output --partial 16471
}

@test "calculate_bitrate: available bitrate lower than calculated" {
  run calculate_bitrate 5000 "1920x1080" 60
  assert_success
  assert_output --partial 5000
}

@test "calculate_bitrate: available bitrate higher than calculated" {
  run calculate_bitrate 50000 "1920x1080" 60
  assert_success
  assert_output --partial "is higher than calculated/measured bitrate"
  assert_output --partial 16471
}

# === Latency Handling ===

@test "determine_latency: no current latency" {
  run determine_latency 0 0 false
  assert_success
  assert_output 1
}

@test "determine_latency: measured latency higher than max" {
  run determine_latency 20 10 false
  assert_failure

  assert_output --partial "Measured latency"
  assert_output --partial "is higher than the specified maximum "
  assert_output --partial "Aborting"
}

# === Streaming Parameter Setting ===

@test "set_streaming_parameters: default parameters" {
  get_display_refresh_rate() {
    echo "60"
  }

  get_display_resolution() {
    echo "1920x1080"
  }

  run set_streaming_parameters false false false "1920x1080" false 60 0 0 0 false
  assert_success
  assert_output --partial "1920x1080 60 16471 1"
}

@test "set_streaming_parameters: custom parameters" {
  get_display_refresh_rate() {
    echo "60"
  }

  get_display_resolution() {
    echo "1920x1080"
  }

  run set_streaming_parameters true true false "1280x720" true 30 5000 20 30 true
  assert_success
  assert_output --partial "1280x720 30 4444 20"
}

@test "set_streaming_parameters: invalid parameters" {
  get_display_refresh_rate() {
    echo "60"
  }

  get_display_resolution() {
    echo "1920x1080"
  }

  run set_streaming_parameters true true false "invalid" true "invalid" "invalid" "invalid" "invalid" true
  assert_failure
  assert_output --partial "ERROR: Invalid resolution format. Expected WxH (e.g., 1920x1080)."
}

# === Moonlight Stream Starting ===

@test "start_moonlight_stream: dry run mode" {
  export LOG_LEVEL=5

  run start_moonlight_stream "host" "app" "1920x1080" 60 5000 true
  assert_success
  assert_output --partial "Dry run mode"
}

@test "start_moonlight_stream: actual run" {
  run start_moonlight_stream "host" "app" "1920x1080" 60 5000 true
  assert_success
}

# === Main Function ===

@test "main: successful execution" {
  export DRY_RUN=true

  get_display_refresh_rate() {
    echo "60"
  }

  get_display_resolution() {
    echo "1920x1080"
  }

  run main stream host app
  assert_success
}

@test "main: failure due to invalid arguments" {
  export DRY_RUN=true

  run main invalid_argument
  assert_failure
}

@test "main: interactive mode" {
  skip
  export DRY_RUN=true

  run main --interactive stream host app
  assert_success
}

@test "main: dry run mode" {
  skip
  run main --dry-run stream host app
  assert_success
}

# === Utility Functions ===

@test "is_valid_resolution: valid resolution" {
  run is_valid_resolution "1920x1080"
  assert_success
}

@test "is_valid_resolution: invalid resolution" {
  run is_valid_resolution "invalid"
  assert_failure
}

@test "compare_resolutions: first resolution smaller" {
  run compare_resolutions "1280x720" "1920x1080"
  assert_success
  assert_output "1280x720"
}

@test "compare_resolutions: second resolution smaller" {
  run compare_resolutions "1920x1080" "1280x720"
  assert_success
  assert_output "1280x720"
}

@test "compare_fps: first fps lower" {
  run compare_fps 30 60
  assert_success
  assert_output "30"
}

@test "compare_fps: second fps lower" {
  run compare_fps 60 30
  assert_success
  assert_output "30"
}

@test "compare_bitrate: first bitrate lower" {
  run compare_bitrate 5000 10000
  assert_success
  assert_output "5000"
}

@test "compare_bitrate: second bitrate lower" {
  run compare_bitrate 10000 5000
  assert_success
  assert_output "5000"
}

# === Network and Display Functions ===

@test "measure_network_speed_to_host: successful measurement" {
  skip
  run measure_network_speed_to_host "valid_host" 31347
  assert_success
}

@test "measure_network_speed_to_host: failed measurement" {
  skip
  run measure_network_speed_to_host "invalid_host" 31347
  assert_failure
}

@test "measure_latency: successful measurement" {
  skip
  run measure_latency
  assert_success
}

@test "measure_latency: failed measurement" {
  skip
  run measure_latency
  assert_failure
}

@test "get_display_resolution: successful retrieval" {
  get_display_resolution() {
    echo "1920x1080"
  }

  run get_display_resolution
  assert_success
}

@test "get_display_refresh_rate: successful retrieval" {
  get_display_refresh_rate() {
    echo "60"
  }

  run get_display_refresh_rate
  assert_success
}

# === Optimization Functions ===

@test "optimize_streaming_settings: successful optimization" {
  run optimize_streaming_settings 30 60 "1280x720" "1920x1080" 10000 20 "fps" 128
  assert_success
}

@test "optimize_streaming_settings: invalid parameters" {
  run optimize_streaming_settings "invalid" "invalid" "invalid" "invalid" "invalid" "invalid" "invalid" "invalid"
  assert_failure
}

# === Display Functions ===

@test "display_streaming_settings: successful display" {
  run display_streaming_settings "1920x1080" 60 10000 20 "host" "app"
  assert_success
}
