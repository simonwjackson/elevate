#!/usr/bin/env bats

source "${MOONBEAM_BIN:-moonbeam}"

run_iperf3() {
  echo '{ "end": { "sum_received": { "bits_per_second": 100000000 }}}'
}
export -f run_iperf3

check_sunshine_availability() {
  return 0
}
export -f check_sunshine_availability

# get_display_refresh_rate() {
#   echo 60
# }
# export -f get_display_refresh_rate
#
# get_display_resolution() {
#   echo "1920x1080"
# }
# export -f get_display_resolution

run_ping() {
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
export -f run_ping

@test "convert_bitrate_value handles Mbps correctly" {
  result=$(convert_bitrate_value "5Mbps")
  [ "$result" = "5000" ]
}

@test "convert_bitrate_value handles Kbps correctly" {
  result=$(convert_bitrate_value "5000Kbps")
  [ "$result" = "5000" ]
}

@test "convert_latency_value removes ms suffix" {
  result=$(convert_latency_value "100ms")
  [ "$result" = "100" ]
}

@test "moonbeam stream --help shows usage information" {
  run main stream --help
  [ "$status" -eq 0 ]
  [[ "$output" =~ "Usage:" ]]
  [[ "$output" =~ "Options:" ]]
  [[ "$output" =~ "Arguments:" ]]
}

@test "moonbeam stream" {
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
    "2560x1440@59.95Hz",
    "2560x1440@359.98Hz",
    "2560x1440@239.97Hz",
    "2560x1440@143.91Hz",
    "2560x1440@120.00Hz",
    "1920x1200@59.95Hz",
    "1920x1080@239.76Hz",
    "1920x1080@120.00Hz",
    "1920x1080@119.88Hz",
    "1920x1080@60.00Hz",
    "1920x1080@60.00Hz",
    "1920x1080@59.94Hz",
    "1920x1080@50.00Hz",
    "1920x1080@30.00Hz",
    "1920x1080@29.97Hz",
    "1920x1080@25.00Hz",
    "1920x1080@24.00Hz",
    "1920x1080@23.98Hz",
    "1600x1200@59.95Hz",
    "1680x1050@59.95Hz",
    "1600x900@60.00Hz",
    "1280x1024@75.03Hz",
    "1280x1024@60.02Hz",
    "1440x900@59.95Hz",
    "1280x800@59.95Hz",
    "1152x864@75.00Hz",
    "1280x720@60.00Hz",
    "1280x720@59.94Hz",
    "1280x720@50.00Hz",
    "1024x768@75.03Hz",
    "1024x768@60.00Hz",
    "800x600@75.00Hz",
    "800x600@60.32Hz",
    "720x576@50.00Hz",
    "720x480@60.00Hz",
    "720x480@60.00Hz",
    "720x480@59.94Hz",
    "720x480@59.94Hz",
    "640x480@75.00Hz",
    "640x480@60.00Hz",
    "640x480@59.94Hz",
    "640x480@59.94Hz",
    "720x400@70.08Hz"
  ]
}
EOF
  }
  export -f get_monitor_info_hyprland

  is_hyprland_running() { return 0; }
  export -f is_hyprland_running

  run main stream host Desktop --dry-run --log-level VERBOSE

  echo $output

  [ "$status" -eq 0 ]
  [[ "$output" =~ "Measured network speed: 100000" ]]
  [[ "$output" =~ "Using FPS: 360" ]]
}
