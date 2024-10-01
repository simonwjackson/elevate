#!/usr/bin/env bats

# setup() {
# bats_load_library bats-support
# bats_load_library bats-assert

source "./calculate.sh"
# }

@test "is_valid_resolution: valid resolution" {
  run is_valid_resolution "1280x720"
  [ "$status" -eq 0 ]
}

@test "is_valid_resolution: invalid resolution (too small)" {
  run is_valid_resolution "200x200"
  [ "$status" -eq 1 ]
}

@test "is_valid_resolution: invalid format" {
  run is_valid_resolution "1280-720"
  [ "$status" -eq 1 ]
}

@test "generate_scaled_resolutions: basic functionality" {
  result=$(generate_scaled_resolutions "640x360" "1920x1080" 5)
  [ "$(echo "$result" | wc -l)" -ge 3 ]
  [[ "$result" == *"640x360"* ]]
  [[ "$result" == *"1920x1080"* ]]
}

@test "estimate_required_bitrate: basic functionality" {
  result=$(estimate_required_bitrate "1920x1080" 30)
  [ "$result" -gt 0 ]
}

@test "parse_resolution: valid resolution" {
  result=$(parse_resolution "1280x720")
  [ "$result" = "1280 720" ]
}

@test "parse_resolution: invalid resolution" {
  run parse_resolution "1280-720"
  [ "$status" -eq 1 ]
}

@test "round: basic functionality" {
  result=$(round 3.7)
  [ "$result" -eq 4 ]
}

@test "scale_resolution: basic functionality" {
  result=$(scale_resolution 1280 720 1.5)
  [ "$result" = "1920 1080" ]
}

# Test for invalid input
@test "calculate_scaled_resolutions should fail with invalid input" {
  run calculate_scaled_resolutions "invalid" "1920x1080" 5

  [ "$status" -eq 1 ]
}

@test "minimum_viable_resolution: basic functionality" {
  result=$(minimum_viable_resolution "640x360" "1920x1080")
  [[ "$result" =~ ^[0-9]+x[0-9]+$ ]]
}

@test "find_factors_in_range: basic functionality" {
  result=$(find_factors_in_range 29 120 10)
  [[ "$result" == *"30"* && "$result" == *"60"* && "$result" == *"120"* ]]
}

@test "find_factors_in_range: with max_factors" {
  result=$(find_factors_in_range 29 120 10 1)
  [ "$(echo "$result" | wc -w)" -eq 1 ]
}
