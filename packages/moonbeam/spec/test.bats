#!/usr/bin/env bats

source "./moonbeam"

setup() {
  # Mock functions
  get_monitor_info_hyprland() {
    cat <<EOF
{
  "id": 0,
  "name": "DP-1",
  "description": "Dell Inc. AW2725DF H492ZZ3",
  "make": "Dell Inc.",
  "model": "AW2725DF",
  "serial": "H492ZZ3",
  "width": 2560,
  "height": 1440,
  "refreshRate": 359.97900,
  "x": 0,
  "y": 0,
  "activeWorkspace": {
    "id": 1,
    "name": "1"
  },
  "specialWorkspace": {
    "id": 0,
    "name": ""
  },
  "reserved": [
    250,
    80,
    250,
    80
  ],
  "scale": 1.00,
  "transform": 0,
  "focused": true,
  "dpmsStatus": true,
  "vrr": false,
  "activelyTearing": false,
  "disabled": false,
  "currentFormat": "XRGB2101010",
  "availableModes": [
    "2560x1440@359.98Hz",
    "2560x1440@239.97Hz",
    "2560x1440@143.91Hz",
    "2560x1440@120.00Hz",
    "2560x1440@59.95Hz"
  ]
}
EOF
  }
  export -f get_monitor_info_hyprland

  run_iperf3() {
    echo '{ "end": { "sum_received": { "bits_per_second": 100000000 }}}'
  }
  export -f run_iperf3

  check_sunshine_availability() {
    return 0
  }
  export -f check_sunshine_availability

  _ping() {
    cat <<EOF
PING example.com (93.184.216.34) 56(84) bytes of data.
64 bytes from 93.184.216.34: icmp_seq=1 ttl=56 time=20.1 ms
64 bytes from 93.184.216.34: icmp_seq=2 ttl=56 time=19.8 ms
64 bytes from 93.184.216.34: icmp_seq=3 ttl=56 time=20.3 ms
64 bytes from 93.184.216.34: icmp_seq=4 ttl=56 time=19.9 ms
64 bytes from 93.184.216.34: icmp_seq=5 ttl=56 time=20.2 ms

--- example.com ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4006ms
rtt min/avg/max/mdev = 19.761/20.060/20.300/0.193 ms
EOF
  }
  # export -f run_ping

  is_hyprland_running() { return 0; }
  # export -f is_hyprland_running

  run_iperf3() {
    echo '{ "end": { "sum_received": { "bits_per_second": 100000000 }}}'
  }
  # export -f run_iperf3

  _nc() { return 0; }
  # export -f _nc

  _xrandr() {
    cat <<EOF
  Screen 0: minimum 16 x 16, current 1920 x 1200, maximum 32767 x 32767
eDP-1 connected 1920x1200+0+0 (normal left inverted right x axis y axis) 340mm x 220mm
   1920x1200    119.90*+
   1600x1200    119.82  
   1440x1080    119.92  
   1400x1050    119.90  
   1280x1024    119.83  
   1280x960     119.89  
   1152x864     119.77  
   1024x768     119.80  
   800x600      119.85  
   640x480      119.52  
   320x240      117.34  
   1680x1050    119.89  
   1440x900     119.94  
   1280x800     119.85  
   1152x720     119.73  
   960x600      119.74  
   928x580      119.55  
   800x500      119.47  
   768x480      119.71  
   720x480      119.65  
   640x400      119.64  
   320x200      117.55  
   1920x1080    119.93  
   1600x900     119.95  
   1368x768     119.83  
   1280x720     119.86  
   1024x576     119.85  
   864x486      119.69  
   720x400      119.54  
   640x350      119.24
EOF
  }

  export XDG_SESSION_TYPE="wayland"
}

@test "moonbeam stream --help shows usage information" {
  run main stream --help
  [ "$status" -eq 0 ]
  [[ "$output" =~ "Usage:" ]]
  [[ "$output" =~ "Options:" ]]
  [[ "$output" =~ "Arguments:" ]]
}

@test "moonbeam stream (hyprland)" {
  run main stream host Desktop --dry-run --log-level VERBOSE

  [ "$status" -eq 0 ]
  [[ "$output" =~ "Measured network speed: 100000" ]]
  [[ "$output" =~ "Using FPS: 360" ]]
}

@test "moonbeam stream (xrandr)" {
  is_hyprland_running() { return 1; }
  run main stream host Desktop --dry-run --log-level VERBOSE

  [ "$status" -eq 0 ]
  [[ "$output" =~ "Measured network speed: 100000" ]]
  [[ "$output" =~ "Using FPS: 120" ]]
}
