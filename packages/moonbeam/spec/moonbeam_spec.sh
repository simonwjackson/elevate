#!/usr/bin/env shellspec

Describe 'moonbeam'
  Include ./spec/mocks/iperf3.sh
  Include ./spec/mocks/xrandr.sh
  Include ./spec/mocks/ping.sh

  setup () {
    source ./bin/moonbeam

    await() {
      local spin_args=()
      local command=""
      local args=()

      while [[ $# -gt 0 ]]; do
        case "$1" in
        --)
          shift
          command="$1"
          shift
          args=("$@")
          break
          ;;
        *)
          spin_args+=("$1")
          shift
          ;;
        esac
      done

      "$command" "${args[@]}"
    }

    check_sunshine_availability() {
      return 0
    }

    get_display_resolution() {
      echo "1920x1080"
    }

    get_effective_max_fps() {
      echo "72"
    }

    moonlight () {
      return 0
    }
  }

  BeforeEach 'setup'

  It 'supports basic usage'
    When run main stream host game
    The status should be success
    The output should include '1080p'
    The output should include '72'
    The output should include '19 Mbps'
    The output should include 'Reconnect: No'
    The stderr should include 'max_resolution: 1920x1080'
  End

  It 'handles --version flag correctly'
    When run main --version
    The status should be success
    The output should include 'Moonbeam version'
    The stderr should include 'Processing argument: --version'
  End

  It 'sets custom max latency correctly'
    When run main stream myhost mygame --max-latency 50
    The status should be success
    The output should include '1080p'
    The output should include '36'
    The output should include '11 Mbps'
    The stderr should include 'max_latency: 50'
  End

  It 'processes bitrate option'
    When run main stream myhost mygame --bitrate 10Mbps
    The status should be success
    The output should include 'Configuration'
    The output should include '1279x719'
    The output should include '72'
    The output should include '8 Mbps'
    The stderr should include 'max_bitrate: 10000'
  End

  It 'processes max-bitrate option'
    When run main stream myhost mygame --max-bitrate 15Mbps
    The status should be success
    The output should include 'Configuration'
    The output should include '1706x959'
    The output should include '72'
    The output should include '15 Mbps'
    The stderr should include 'max_bitrate: 15000'
  End

  It 'handles max-resolution option'
    When run main stream myhost mygame --max-resolution 1280x720
    The status should be success
    The output should include '720p'
    The output should include '72'
    The output should include '8 Mbps'
    The stderr should include 'max_resolution: 1280x720'
  End

  It 'handles min-resolution option'
    When run main stream myhost mygame --min-resolution 640x360
    The status should be success
    The output should include '1080p'
    The output should include '72'
    The output should include '19 Mbps'
    The stderr should include 'min_resolution: 640x360'
  End

  xIt 'handles resolution option'
    When run main stream myhost mygame --resolution 1920x1080
    The status should be success
    The output should include '1080p'
    The output should include '72'
    The output should include '19 Mbps'
    The stderr should include 'max_resolution: 1920x1080'
    The stderr should include 'min_resolution: 1920x1080'
  End

  xIt 'processes shorthand resolution option --720p'
    When run main stream myhost mygame --720p
    The status should be success
    The output should include '720p'
    The output should include '72'
    The output should include '8 Mbps'
    The stderr should include 'max_resolution: 1280x720'
    The stderr should include 'min_resolution: 1280x720'
  End

  xIt 'processes shorthand resolution option --1080p'
    When run main stream myhost mygame --1080p
    The status should be success
    The output should include '1080p'
    The output should include '72'
    The output should include '19 Mbps'
    The stderr should include 'max_resolution: 1920x1080'
    The stderr should include 'min_resolution: 1920x1080'
  End

  xIt 'processes shorthand resolution option --4K'
    get_display_resolution() {
      echo "3840x2160"
    }

    When run main stream myhost mygame --4K
    The status should be success
    The output should include '2160p'
    The output should include '72'
    The output should include '76 Mbps'
    The stderr should include 'max_resolution: 3840x2160'
    The stderr should include 'min_resolution: 3840x2160'
  End

  It 'sets custom max FPS option'
    When run main stream myhost mygame --max-fps 90
    The status should be success
    The output should include '1080p'
    The output should include '72'
    The output should include '19 Mbps'
    The stderr should include 'max_fps: 72'
  End

  It 'sets custom min FPS option'
    When run main stream myhost mygame --min-fps 30
    The status should be success
    The output should include '1080p'
    The output should include '72'
    The output should include '19 Mbps'
    The stderr should include 'min_fps: 30'
  End

  It 'sets custom FPS option'
    When run main stream myhost mygame --fps 60
    The status should be success
    The output should include '1080p'
    The output should include '72'
    The output should include '19 Mbps'
    The stderr should include 'max_fps: 72'
    The stderr should include 'min_fps: 60'
  End

  It 'handles resolution steps option'
    When run main stream myhost mygame --resolution-steps 5
    The status should be success
    The output should include '1080p'
    The output should include '72'
    The output should include '19 Mbps'
    The stderr should include 'resolution_steps: 5'
  End

  It 'sets priority option correctly'
    When run main stream myhost mygame --priority fps
    The status should be success
    The output should include '1080p'
    The output should include '72'
    The output should include '19 Mbps'
    The stderr should include 'priority: fps'
  End
End
