#!/usr/bin/env bash

source ./log.sh

is_valid_resolution() {
  local resolution="$1"
  local width height
  IFS='x' read -r width height <<<"$resolution"
  [[ "$width" =~ ^[0-9]+$ && "$height" =~ ^[0-9]+$ && $width -ge 256 && $height -ge 256 ]]
}

list_valid_fps_values() {
  local min_fps=$1
  local max_fps=$2
  local valid_fps_values=()

  if ! [[ "$min_fps" =~ ^[0-9]+$ && "$max_fps" =~ ^[0-9]+$ ]]; then
    error "min_fps and max_fps must be positive integers"
    return 1
  fi

  if ((min_fps > max_fps)); then
    error "min_fps cannot be greater than max_fps"
    return 1
  fi

  for ((fps = min_fps; fps <= max_fps; fps++)); do
    if ((max_fps % fps == 0)); then
      valid_fps_values+=("$fps")
    fi
  done

  if [[ ${#valid_fps_values[@]} -eq 0 ]]; then
    error "No valid FPS values found"
    return 1
  fi

  # Use printf to join the array elements with spaces, then trim the trailing space
  printf '%s ' "${valid_fps_values[@]}" | sed 's/ $//'
}

generate_scaled_resolutions() {
  local min_resolution="$1"
  local max_resolution="$2"
  local scaling_steps="$3"
  local min_width min_height max_width max_height

  IFS='x' read -r min_width min_height <<<"$min_resolution"
  IFS='x' read -r max_width max_height <<<"$max_resolution"

  if ! [[ "$min_width" =~ ^[0-9]+$ && "$min_height" =~ ^[0-9]+$ &&
    "$max_width" =~ ^[0-9]+$ && "$max_height" =~ ^[0-9]+$ &&
    "$scaling_steps" =~ ^[0-9]+$ ]]; then
    error "Invalid input. All parameters must be positive integers."
    return 1
  fi

  if ((min_width > max_width || min_height > max_height)); then
    error "min_resolution cannot be greater than max_resolution"
    return 1
  fi

  local min_scale_factor
  min_scale_factor=$(bc -l <<<"scale=6; $min_width / $max_width")

  local -a scale_factors=()
  for ((step = 1; step <= scaling_steps; step++)); do
    local scale_factor
    scale_factor=$(bc -l <<<"scale=6; $step / $scaling_steps")
    if (($(bc <<<"$scale_factor >= $min_scale_factor"))); then
      scale_factors+=("$scale_factor")
    fi
  done

  {
    printf "%dx%d\n" "$min_width" "$min_height"
    for scale_factor in "${scale_factors[@]}"; do
      local current_width current_height
      current_width=$(bc <<<"scale=0; $max_width * $scale_factor / 1")
      current_height=$(bc <<<"scale=0; $max_height * $scale_factor / 1")

      if ((current_width > min_width && current_height > min_height && current_width <= max_width && current_height <= max_height)); then
        printf "%dx%d\n" "$current_width" "$current_height"
      fi
    done
  } | sort -t'x' -k1,1n -k2,2n | uniq
}

estimate_required_bitrate() {
  local resolution="$1"
  local fps="$2"
  local width height

  IFS='x' read -r width height <<<"$resolution"

  if ! [[ "$width" =~ ^[0-9]+$ && "$height" =~ ^[0-9]+$ && "$fps" =~ ^[0-9]+$ ]]; then
    error "Invalid input. Width, height, and FPS must be positive integers."
    return 1
  fi

  local pixel_count=$((width * height))
  local resolution_ratio
  resolution_ratio=$(bc -l <<<"scale=6; $pixel_count / (3840 * 2160)")

  local base_fps=30
  local bitrate_exponent=0.72
  local fps_factor
  fps_factor=$(bc -l <<<"scale=6; e(l($fps/$base_fps)*$bitrate_exponent)")

  local base_bitrate=40000 # 40 Mbps in Kbps

  local estimated_bitrate
  estimated_bitrate=$(bc -l <<<"scale=0; ($base_bitrate * $resolution_ratio * $fps_factor) / 1")

  echo "$estimated_bitrate"
}

find_best_fps_for_latency() {
  local latency="$1"
  local min_fps="$2"
  local max_fps="$3"
  local -a valid_fps_values

  # Read the space-separated string into an array
  read -ra valid_fps_values <<<"$4"

  if ! [[ "$latency" =~ ^[0-9]+(\.[0-9]+)?$ && "$min_fps" =~ ^[0-9]+$ && "$max_fps" =~ ^[0-9]+$ ]]; then
    error "Invalid input. Latency must be a positive number, min_fps and max_fps must be positive integers."
    return 1
  fi

  # Convert latency to an integer (milliseconds)
  latency=${latency%.*}
  latency=$((latency > 0 ? latency : 1))

  local ideal_fps=$((1000 / latency))

  if ((ideal_fps > max_fps)); then
    ideal_fps=$max_fps
  elif ((ideal_fps < min_fps)); then
    error "Latency is too high for the given FPS range"
    return 1
  fi

  local best_fps=0
  for current_fps in "${valid_fps_values[@]}"; do
    if ((current_fps <= ideal_fps && current_fps > best_fps)); then
      best_fps=$current_fps
    fi
  done

  if ((best_fps == 0)); then
    error "No suitable FPS found for the given latency"
    return 1
  fi

  echo "$best_fps"
}

optimize_streaming_settings() {
  local min_fps="$1"
  local max_fps="$2"
  local min_resolution="$3"
  local max_resolution="$4"
  local available_bitrate="$5"
  local latency="$6"
  local preference="$7"
  local scaling_steps="$8"

  if ! [[ "$min_fps" =~ ^[0-9]+$ && "$max_fps" =~ ^[0-9]+$ &&
    "$available_bitrate" =~ ^[0-9]+$ && "$latency" =~ ^[0-9]+(\.[0-9]+)?$ &&
    "$scaling_steps" =~ ^[0-9]+$ ]]; then
    error "Invalid input. Numeric parameters must be positive numbers."
  fi

  if ! is_valid_resolution "$min_resolution" || ! is_valid_resolution "$max_resolution"; then
    error "Invalid resolution format. Must be in the form WIDTHxHEIGHT."
    return 1
    return 1
  fi

  if [[ "$preference" != "fps" && "$preference" != "resolution" ]]; then
    error "Invalid preference. Must be 'fps' or 'resolution'."
    return 1
  fi

  local valid_fps_values
  valid_fps_values=$(list_valid_fps_values "$min_fps" "$max_fps")
  if [[ $? -ne 0 ]]; then
    echo "$valid_fps_values" >&2
    return 1
  fi

  local max_allowed_fps
  max_allowed_fps=$(find_best_fps_for_latency "$latency" "$min_fps" "$max_fps" "$valid_fps_values")
  if [[ $? -ne 0 ]]; then
    echo "$max_allowed_fps" >&2
    return 1
  fi

  local best_resolution="" best_fps="" best_bitrate=0
  local found_setting="false"

  if [[ "$preference" == "fps" ]]; then
    for current_fps in $(echo "$valid_fps_values" | tr ' ' '\n' | sort -nr); do
      if ((current_fps <= max_allowed_fps)); then
        for current_resolution in $(generate_scaled_resolutions "$min_resolution" "$max_resolution" "$scaling_steps" | sort -nr); do
          current_bitrate=$(estimate_required_bitrate "$current_resolution" "$current_fps")
          if ((current_bitrate <= available_bitrate)); then
            best_resolution="$current_resolution"
            best_fps="$current_fps"
            best_bitrate="$current_bitrate"
            found_setting="true"
            break 2
          fi
        done
      fi
    done
  else
    for current_resolution in $(generate_scaled_resolutions "$min_resolution" "$max_resolution" "$scaling_steps" | sort -nr); do
      for current_fps in $(echo "$valid_fps_values" | tr ' ' '\n' | sort -nr); do
        if ((current_fps <= max_allowed_fps)); then
          current_bitrate=$(estimate_required_bitrate "$current_resolution" "$current_fps")
          if ((current_bitrate <= available_bitrate)); then
            best_resolution="$current_resolution"
            best_fps="$current_fps"
            best_bitrate="$current_bitrate"
            found_setting="true"
            break 2
          fi
        fi
      done
    done
  fi

  if [[ "$found_setting" != "true" ]]; then
    error "No suitable settings found within the given constraints"
    return 1
  fi

  local min_width min_height best_width best_height
  IFS='x' read -r min_width min_height <<<"$min_resolution"
  IFS='x' read -r best_width best_height <<<"$best_resolution"

  if ((best_width < min_width || best_height < min_height)); then
    warn "Cannot find suitable settings above minimum resolution. Using minimum resolution with adjusted FPS."
    best_resolution="$min_resolution"

    for current_fps in $(echo "$valid_fps_values" | tr ' ' '\n' | sort -nr); do
      if ((current_fps <= max_allowed_fps)); then
        current_bitrate=$(estimate_required_bitrate "$best_resolution" "$current_fps")
        if ((current_bitrate <= available_bitrate)); then
          best_fps="$current_fps"
          best_bitrate="$current_bitrate"
          found_setting="true"
          break
        fi
      fi
    done

    if [[ "$found_setting" != "true" ]]; then
      error "No suitable settings found within the given constraints"
      return 1
    fi
  fi

  echo "$best_resolution $best_fps $best_bitrate"
}
