#!/usr/bin/env  bash

# Source the script to test
. ./bin/moonbeam

testMoonbeamHelp() {
  # Capture the output of moonbeam --help
  main stream --help
  output=$(main --help)

  # Test that the output contains expected sections
  assertContains "$output" "Usage:"
  # assertContains "$output" "Moonbeam Options:"
  # assertContains "$output" "Moonlight Options:"
  # assertContains "$output" "Arguments:"

  # Test for specific options
  # assertContains "$output" "--bitrate"
  # assertContains "$output" "--resolution"
  # assertContains "$output" "--max-fps"
  # assertContains "$output" "--priority"
  #
  # # Test for the presence of the stream command
  # assertContains "$output" "stream <host> <app>"
  #
  # # Test that the output doesn't contain unexpected content
  # assertNotContains "$output" "ERROR"
  # assertNotContains "$output" "FAILURE"
}

# Load shunit2
. shunit2
