check_host_latency() {
  local current_latency=$1
  local max_latency=$2

  if (($(echo "$current_latency == 0" | bc -l))); then
    if measured_latency=$(measure_latency); then
      debug "Measured latency: $measured_latency ms"
      current_latency=$measured_latency
    else
      local default_latency=1
      warn "Failed to measure latency. Using default value: $default_latency ms"
      current_latency=$default_latency
    fi
  else
    info "Using provided latency: $current_latency ms"
  fi

  if (($(echo "$max_latency > 0" | bc -l))) && (($(echo "$current_latency > $max_latency" | bc -l))); then
    error "Measured latency ($current_latency ms) is higher than the specified maximum ($max_latency ms). Aborting."
    return 1
  fi

  echo "$current_latency"
  return 0
}

get_optimal_bitrate() {
  local available_bitrate=$1
  local max_resolution=$2
  local max_fps=$3

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

measure_latency() {
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
