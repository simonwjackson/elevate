#!/usr/bin/env bats

setup() {
  bats_load_library bats-support
  bats_load_library bats-assert

  DIR="$(cd "$(dirname "$BATS_TEST_FILENAME")" >/dev/null 2>&1 && pwd)"
  # make executables in src/ visible to PATH
  PATH="$DIR/../bin:$PATH"

  # Set default values for potentially unbound variables
  max_resolution=${max_resolution:-"1920x1080"}
  # Add any other variables that might be unbound in moonbeam script

  # Source moonbeam script here, outside of any function
  source "$DIR/../bin/moonbeam"

  # source "$DIR/mocks/xrandr.sh"
  # source "$DIR/mocks/iperf3.sh"
  # source "$DIR/mocks/ping.sh"
  # source "$DIR/mocks/moonlight.sh"

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

@test "process_args: help option" {
  run main --help
  assert_success
  # assert_output --partial "Usage:"
}
