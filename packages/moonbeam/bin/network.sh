measure_network_speed_to_host() {
  local host=$1
  local port=$2
  local retry_count=0
  local max_retries=3
  local retry_delay=5

  while [ "$retry_count" -lt "$max_retries" ]; do
    local result

    result=$(gum spin --spinner meter --title "Running speed test..." -- iperf3 -c "$host" -p "$port" -t 10 -J)

    if echo "$result" | jq -e '.error' >/dev/null 2>&1; then
      local error_message
      error_message=$(echo "$result" | jq -r '.error')
      error "$error_message"
      ((retry_count++))
      [ "$retry_count" -lt "$max_retries" ] && sleep "$retry_delay"
    else
      local speed
      speed=$(echo "$result" | jq -r '.end.sum_received.bits_per_second / 1000' | bc -l | xargs printf "%.0f")
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
  ping_result=$(gum spin --spinner pulse --title "Measuring ping..." -- ping -c 5 "$host" | tail -1 | awk '{print $4}' | cut -d '/' -f 2)

  if [ -z "$ping_result" ]; then
    latency=1
    error "Failed to measure ping to $host. Check your network connection or host."
    return 1
  fi

  echo "$ping_result"
}