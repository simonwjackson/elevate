#!/usr/bin/env bash

testMoonbeamHelp() {
  output=$(moonbeam stream --help)
  assertContains "$output" "Usage:"
  assertContains "$output" "Moonbeam Options:"
  assertContains "$output" "Moonlight Options:"
}

testMoonbeamVersion() {
  output=$(moonbeam --version)
  assertContains "$output" "Moonbeam version"
}

# shellcheck disable=SC1091
. shunit2
