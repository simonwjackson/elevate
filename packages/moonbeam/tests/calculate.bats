#!/usr/bin/env bats

setup() {
  bats_load_library bats-support
  bats_load_library bats-assert

  # Source the utility functions
  source "./log.sh"
  source "./calculate.sh"

  [ ! -f ${BATS_PARENT_TMPNAME}.skip ] || skip "skip remaining tests"
}

teardown() {
  [ -n "$BATS_TEST_COMPLETED" ] || touch ${BATS_PARENT_TMPNAME}.skip
}

# === Resolution Validation Tests ===

@test "is_valid_resolution: valid resolution (1920x1080)" {
  run is_valid_resolution "1920x1080"
  assert_success
}

@test "is_valid_resolution: edge case (256x256)" {
  run is_valid_resolution "256x256"
  assert_success
}

@test "is_valid_resolution: just below minimum (255x256)" {
  run is_valid_resolution "255x256"
  assert_failure
}

@test "is_valid_resolution: invalid resolution (100x100)" {
  run is_valid_resolution "100x100"
  assert_failure
}

@test "is_valid_resolution: non-numeric input" {
  run is_valid_resolution "axb"
  assert_failure
}

# === FPS Calculation Tests ===

@test "list_valid_fps_values: valid range (30 to 60)" {
  run list_valid_fps_values 30 60
  assert_success
  assert_output "30 60"
}

@test "list_valid_fps_values: extended range (15 to 120)" {
  run list_valid_fps_values 15 120
  assert_success
  assert_output "15 20 24 30 40 60 120"
}

@test "list_valid_fps_values: min_fps equal to max_fps" {
  run list_valid_fps_values 30 30
  assert_success
  assert_output "30"
}

@test "list_valid_fps_values: invalid input (min_fps > max_fps)" {
  run list_valid_fps_values 60 30
  assert_failure
}

# === Resolution Scaling Tests ===

@test "generate_scaled_resolutions: valid range (640x360 to 1920x1080, 4 steps)" {
  run generate_scaled_resolutions "640x360" "1920x1080" 4
  assert_success
  assert_line --index 0 "640x360"
  assert_line --index 1 "960x540"
  assert_line --index 2 "1440x810"
  assert_line --index 3 "1920x1080"
}

@test "generate_scaled_resolutions: min_resolution equal to max_resolution" {
  run generate_scaled_resolutions "1920x1080" "1920x1080" 4
  assert_success
  assert_output "1920x1080"
}

@test "generate_scaled_resolutions: different scaling_steps" {
  run generate_scaled_resolutions "640x360" "1920x1080" 3
  assert_success
  assert_line --index 0 "640x360"
  assert_line --index 1 "1279x719"
  assert_line --index 2 "1920x1080"
}

@test "generate_scaled_resolutions: invalid input (min_resolution > max_re solution)" {
  run generate_scaled_resolutions "1920x1080" "1280x720" 4
  assert_failure
}

# === Bitrate Estimation Tests ===

@test "estimate_required_bitrate: 720p at 30fps" {
  run estimate_required_bitrate "1280x720" 30
  assert_success
  assert_output --regexp "[0-9]+" # Ensure output is a number
}

@test "estimate_required_bitrate: 1080p at 60fps" {
  run estimate_required_bitrate "1920x1080" 60
  assert_success
  assert_output "16471"
}

@test "estimate_required_bitrate: 4K at 30fps" {
  run estimate_required_bitrate "3840x2160" 30
  assert_success
  assert_output "40000"
}

@test "estimate_required_bitrate: 4K at 120fps" {
  run estimate_required_bitrate "3840x2160" 120
  assert_success
  assert_output --regexp "[0-9]+" # Ensure output is a number
}

# === Latency Optimization Tests ===

@test "find_best_fps_for_latency: within range" {
  run find_best_fps_for_latency 16 30 60 "30 60"
  assert_success
  assert_output "60"
}

@test "find_best_fps_for_latency: latency too high" {
  run find_best_fps_for_latency 100 30 60 "30 60"
  assert_failure
}

@test "find_best_fps_for_latency: latency exactly matching an fps" {
  run find_best_fps_for_latency 33 30 60 "30 60"
  assert_success
  assert_output "30"
}

@test "find_best_fps_for_latency: single fps value" {
  run find_best_fps_for_latency 20 30 30 "30"
  assert_success
  assert_output "30"
}

# === Streaming Settings Optimization Tests ===

@test "optimize_streaming_settings: prefer fps" {
  run optimize_streaming_settings 30 60 "640x360" "1920x1080" 20000 16 "fps" 4
  assert_success
  assert_output --partial "1920x1080 60 16471"
}

@test "optimize_streaming_settings: prefer resolution" {
  run optimize_streaming_settings 30 60 "640x360" "1920x1080" 20000 16 "resolution" 4
  assert_success
  assert_output --partial "1920x1080 60 16471"
}

@test "optimize_streaming_settings: insufficient bitrate" {
  run optimize_streaming_settings 144 144 "3840x2160" "3840x2160" 1000 1 "fps" 4
  assert_failure
}

@test "optimize_streaming_settings: min_resolution = max_resolution" {
  run optimize_streaming_settings 30 60 "1920x1080" "1920x1080" 20000 16 "fps" 4
  assert_success
  assert_output --partial "1920x1080"
}

@test "optimize_streaming_settings: min_fps = max_fps" {
  run optimize_streaming_settings 30 30 "640x360" "1920x1080" 20000 16 "resolution" 4
  assert_success
  assert_output --partial "30"
}

@test "optimize_streaming_settings: invalid preference" {
  run optimize_streaming_settings 30 60 "640x360" "1920x1080" 20000 16 "invalid" 4
  assert_failure
}

@test "optimize_streaming_settings: very low available_bitrate" {
  run optimize_streaming_settings 30 60 "640x360" "1920x1080" 100 16 "resolution" 4
  assert_failure
}
