#!/usr/bin/env bash

source ./log.sh

is_valid_resolution() {
  local resolution="$1"
  local width height
  IFS='x' read -r width height <<<"$resolution"
  [[ "$width" =~ ^[0-9]+$ && "$height" =~ ^[0-9]+$ && $width -ge 256 && $height -ge 256 ]]
}

# TODO: move to validation
# if ! [[ "$min_fps" =~ ^[0-9]+$ && "$max_fps" =~ ^[0-9]+$ ]]; then
#   error "min_fps and max_fps must be positive integers"
#   return 1
# fi
#
# if ((min_fps > max_fps)); then
#   error "min_fps cannot be greater than max_fps"
#   return 1
# fi

# TODO: move to verification
# if ! [[ "$min_width" =~ ^[0-9]+$ && "$min_height" =~ ^[0-9]+$ &&
#   "$max_width" =~ ^[0-9]+$ && "$max_height" =~ ^[0-9]+$ &&
#   "$scaling_steps" =~ ^[0-9]+$ ]]; then
#   error "Invalid input. All parameters must be positive integers."
#   return 1
# fi

# if ((min_width > max_width || min_height > max_height)); then
#   error "min_resolution cannot be greater than max_resolution"
#   return 1
# fi

generate_scaled_resolutions() {
  local min_resolution="$1"
  local max_resolution="$2"
  local scaling_steps="$3"
  local min_width min_height max_width max_height

  IFS='x' read -r min_width min_height <<<"$min_resolution"
  IFS='x' read -r max_width max_height <<<"$max_resolution"

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

  if ((latency == 0)); then
    echo "$max_fps"
    return 0
  fi

  # Read the space-separated string into an array
  read -ra valid_fps_values <<<"$4"

  # if ! [[ "$latency" =~ ^[0-9]+(\.[0-9]+)?$ && "$min_fps" =~ ^[0-9]+$ && "$max_fps" =~ ^[0-9]+$ ]]; then
  #   error "Invalid input. Latency must be a positive number, min_fps and max_fps must be positive integers."
  #   return 1
  # fi

  # # Convert latency to an integer (milliseconds)
  # latency=${latency%.*}
  # latency=$((latency > 0 ? latency : 1))

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
    exit 1
  fi

  echo "$best_fps"
}

optimize_streaming_settings() {
  local min_fps="$1"
  local max_fps="$2"
  local min_resolution="$3"
  local max_resolution="$4"
  local available_bandwidth_kbps="$5"
  local latency="$6"
  local preference="$7"
  local scaling_steps="$8"

  local valid_fps_values
  local max_allowed_fps

  valid_fps_values=$(
    find_factors_in_range "$min_fps" "$max_fps" "$scaling_steps"
  )

  max_allowed_fps=$(find_best_fps_for_latency "$latency" "$min_fps" "$max_fps" "$valid_fps_values")

  local best_resolution="" best_fps="" best_bitrate=0
  local found_setting="false"

  if [[ "$preference" == "fps" ]]; then
    for current_fps in $(echo "$valid_fps_values" | tr ' ' '\n' | sort -nr); do
      if ((current_fps <= max_allowed_fps)); then
        for current_resolution in $(generate_scaled_resolutions "$min_resolution" "$max_resolution" "$scaling_steps" | sort -nr); do
          current_bitrate=$(estimate_required_bitrate "$current_resolution" "$current_fps")
          if ((current_bitrate <= available_bandwidth_kbps)); then
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
          if ((current_bitrate <= available_bandwidth_kbps)); then
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
        if ((current_bitrate <= available_bandwidth_kbps)); then
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

##########
# Resolution Scaler
##########

# Usage
# result=$(calculate_scaled_resolutions "640x360" "1920x1080" 9)
# echo "Scaled resolutions: $result"

parse_resolution() {
  local res=$1
  local width height

  if [[ $res =~ ^([0-9]+)x([0-9]+)$ ]]; then
    width="${BASH_REMATCH[1]}"
    height="${BASH_REMATCH[2]}"
    echo "$width $height"
  else
    gum log --level error "Invalid resolution format: $res"
    return 1
  fi
}

round() {
  printf "%.0f" "$1"
}

scale_resolution() {
  local current_width=$1
  local current_height=$2
  local scale_factor=$3

  local new_width new_height

  new_width=$(round "$(bc -l <<<"$current_width * $scale_factor")")
  new_height=$(round "$(bc -l <<<"$current_height * $scale_factor")")

  echo "$new_width $new_height"
}

generate_resolutions() {
  local current_width=$1
  local current_height=$2
  local target_width=$3
  local target_height=$4
  local count=$5

  local current_aspect_ratio
  local target_aspect_ratio
  local scale_factor_width
  local scale_factor_height
  local max_scale_factor

  current_aspect_ratio=$(bc -l <<<"scale=10; $current_width / $current_height")
  target_aspect_ratio=$(bc -l <<<"scale=10; $target_width / $target_height")
  scale_factor_width=$(bc -l <<<"$target_width / $current_width")
  scale_factor_height=$(bc -l <<<"$target_height / $current_height")
  max_scale_factor=$(bc -l <<<"if ($scale_factor_width > $scale_factor_height) $scale_factor_width else $scale_factor_height")

  for i in $(seq 1 $count | sort -r); do
    local scale_factor
    scale_factor=$(bc -l <<<"1 + ($max_scale_factor - 1) * ($i - 1) / ($count - 1)")
    local new_width new_height
    read -r new_width new_height < <(scale_resolution "$current_width" "$current_height" "$scale_factor")

    # Ensure the new resolution is not smaller than the target in either dimension
    if ((new_width >= target_width && new_height >= target_height)); then
      echo "$new_width $new_height"
    fi
  done
}

calculate_scaled_resolutions() {
  local current_res=$1
  local target_res=$2
  local count=${3:-9}

  local current_width current_height target_width target_height

  read -r current_width current_height < <(parse_resolution "$current_res") || return 1
  read -r target_width target_height < <(parse_resolution "$target_res") || return 1

  generate_resolutions "$current_width" "$current_height" "$target_width" "$target_height" "$count" |
    awk '{ printf "%dx%d ", $1, $2 }' | sed 's/ $//'
}

minimum_viable_resolution() {
  local min=$1
  local max=$2

  calculate_scaled_resolutions "$min" "$max" 2 |
    tac |
    cut -d' ' -f1
}

############
# Factoring
############

# Usage

# echo "All"
# find_factors_in_range 29 120 10

# echo "Limit: 1 (lowest)"
# find_factors_in_range 29 120 10 1

# # Input validation
# if [[ $range_start -gt $range_end || $multiplier -le 0 || $max_factors -lt -1 || $max_factors -eq 0 ]]; then
#   echo "Invalid input parameters" >&2
#   return 1
# fi

find_factors_in_range() {
  local range_start=$1
  local range_end=$2
  local multiplier=$3
  local max_factors=${4:--1} # Default to -1 (show all) if not specified
  local factors=()
  local target_product=$((range_end * multiplier))

  for ((candidate = range_start; candidate <= range_end; candidate++)); do
    if ((target_product % candidate == 0)); then
      factors+=("$candidate")
      if [[ $max_factors -ne -1 && ${#factors[@]} -eq $max_factors ]]; then
        break
      fi
    fi
  done

  echo "${factors[@]}"
}
