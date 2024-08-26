#!/bin/bash

##
# @file network.sh
# @brief Network utility functions for latency checking and bitrate optimization.
# @author Unknown
# @date Unknown

##
# @brief Check if the latency to a host is within acceptable limits.
#
# @param max_latency The maximum acceptable latency in milliseconds.
# @param host The hostname or IP address to check.
#
# @return 0 if latency is acceptable, 1 if it exceeds the maximum.
check_host_latency() {
  local max_latency=$1
  local host=$2
  local measured_latency

  if ((max_latency == 0)); then
    return 0
  fi

  if ! measured_latency=$(measure_latency "$host"); then
    warn "Failed to measure latency. Continuing anyway."
    return 0
  fi

  debug "Measured latency: $measured_latency ms"

  if (($(echo "$measured_latency > $max_latency" | bc -l))); then
    error "Measured latency ($measured_latency ms) exceeds maximum ($max_latency ms). Aborting."
    return 1
  fi

  # Latency is within acceptable range
  return 0
}

##
# @brief Calculate the optimal bitrate based on network conditions and video parameters.
#
# @param available_bitrate The maximum available bitrate in Kbps.
# @param max_resolution The maximum video resolution.
# @param max_fps The maximum frames per second.
# @param host The hostname or IP address to measure network speed against.
#
# @return The optimal bitrate in Kbps.
get_optimal_bitrate() {
  local available_bitrate=$1
  local max_resolution=$2
  local max_fps=$3
  local host=$4

  local measured_bitrate
  local estimated_bitrate
  local calculated_bitrate

  if ! measured_bitrate=$(measure_network_speed_to_host "$host" 31347); then
    warn "Failed to measure network speed. Using estimated bitrate."
    measured_bitrate=0
  else
    debug "Measured network speed: $measured_bitrate Kbps"
  fi

  estimated_bitrate=$(estimate_required_bitrate "$max_resolution" "$max_fps")
  debug "Estimated required bitrate: $estimated_bitrate Kbps"

  if [[ "$measured_bitrate" -eq 0 || "$estimated_bitrate" -lt "$measured_bitrate" ]]; then
    calculated_bitrate=$estimated_bitrate
  else
    calculated_bitrate=$measured_bitrate
  fi

  debug "Calculated bitrate: $calculated_bitrate Kbps"

  if [[ "$available_bitrate" -eq 0 ]]; then
    echo "$calculated_bitrate"
  else
    local lower_bitrate
    lower_bitrate=$(get_lowest_value "$available_bitrate" "$calculated_bitrate")

    if [[ "$lower_bitrate" != "$available_bitrate" ]]; then
      warn "Requested bitrate ($available_bitrate Kbps) is higher than calculated/measured bitrate ($calculated_bitrate Kbps). Using the lower value."
    fi

    debug "Using bitrate: $lower_bitrate Kbps"
    echo "$lower_bitrate"
  fi
}

##
# @brief Measure network speed to a specific host using iperf3.
#
# @param host The hostname or IP address to measure speed against.
# @param port The port to use for the iperf3 test.
#
# @return The measured network speed in Kbps, or 1 on failure.
measure_network_speed_to_host() {
  local host=$1
  local port=$2
  local retry_count=0
  local max_retries=3
  local retry_delay=5

  while [ "$retry_count" -lt "$max_retries" ]; do
    local result

    info "Running speed test..."
    result=$(
      iperf3 \
        -c "$host" \
        -p "$port" \
        -t 2 \
        -i 0.5 \
        -P 4 \
        -J
    )

    if echo "$result" | jq -e '.error' >/dev/null 2>&1; then
      local error_message

      error_message=$(echo "$result" | jq -r '.error')
      error "$error_message"
      ((retry_count++))
      [ "$retry_count" -lt "$max_retries" ] && sleep "$retry_delay"
    else
      local speed

      speed=$(
        echo "$result" |
          jq \
            -r '.end.sum_received.bits_per_second / 1000' |
          bc -l |
          xargs printf "%.0f"
      )
      debug "Bandwidth:" Kbps "${speed}"
      echo "${speed}"
      return 0
    fi
  done

  error "Failed to connect after $max_retries attempts."
  return 1
}

##
# @brief Measure latency to a specific host using ping.
#
# @param host The hostname or IP address to measure latency against.
#
# @return The measured latency in milliseconds, or 1 on failure.
measure_latency() {
  local host=$1
  local ping_result

  info "Measuring ping..."

  ping_result=$(
    ping \
      -c 3 \
      -i 0.2 \
      -W 1 \
      "$host" |
      tail -1 |
      awk '{print $4}' |
      cut \
        -d '/' \
        -f 2
  )

  if [ -z "$ping_result" ]; then
    latency=1
    error "Failed to measure ping to $host. Check your network connection or host."
    return 1
  fi

  echo "$ping_result"
}
