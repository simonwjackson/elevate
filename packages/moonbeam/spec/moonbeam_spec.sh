#!/usr/bin/env shellspec


Describe 'moonbeam'
  Include ./spec/mocks/moonlight.sh
  Include ./spec/mocks/iperf3.sh
  Include ./spec/mocks/xrandr.sh
  Include ./spec/mocks/ping.sh

  setup () {
    source ./bin/moonbeam

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

  It 'prints help information'
    When run main stream host game
    The status should be success
    The output should include '1080p'
    The output should include '72'
  End
End
