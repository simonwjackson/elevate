#!/usr/bin/env bash

limit_max_display_values() {
  local max_resolution_set=$1
  local resolution_set=$2
  local shorthand_res_set=$3
  local max_resolution=$4
  local max_fps_set=$5
  local max_fps=$6

  local new_max_resolution
  local new_max_fps

  new_max_resolution=$(
    get_effective_max_resolution \
      "$max_resolution_set" \
      "$resolution_set" \
      "$shorthand_res_set" \
      "$max_resolution"
  )
  new_max_fps=$(get_effective_max_fps "$max_fps_set" "$max_fps")

  echo "$new_max_resolution" "$new_max_fps"
}

get_lowest_resolution() {
  local res1="$1"
  local res2="$2"

  local area1 area2
  area1=$(calculate_resolution_area_calculate_resolution_area "$res1")
  area2=$(calculate_resolution_area_calculate_resolution_area "$res2")

  local min_area
  min_area=$(get_lowest_value "$area1" "$area2")

  if ((min_area == area1)); then
    echo "$res1"
  else
    echo "$res2"
  fi
}

get_effective_max_fps() {
  local current_max_fps=$1
  local display_fps

  display_fps="$(get_display_refresh_rate)"
  debug "System refresh rate: $display_fps"

  # debug "No max FPS specified. Using display refresh rate: $display_fps"
  local lower_fps
  lower_fps=$(get_lowest_value "$current_max_fps" "$display_fps")

  if [[ "$lower_fps" != "$current_max_fps" ]]; then
    warn "Requested FPS ($current_max_fps) is higher than system refresh rate ($display_fps). Using system refresh rate."
  fi

  debug "Using FPS: $lower_fps"
  echo "$lower_fps"
}

get_lowest_value() {
  local x="$1"
  local y="$2"

  if ((x <= y)); then
    echo "$x"
  else
    echo "$y"
  fi
}

convert_shorthand_resolution() {
  local shorthand=$1
  shorthand=${shorthand%p}

  case $shorthand in
  360) echo "640x360" ;;
  480) echo "854x480" ;;
  540) echo "960x540" ;;
  900) echo "1600x900" ;;
  720) echo "1280x720" ;;
  1080) echo "1920x1080" ;;
  1440) echo "2560x1440" ;;
  2K) echo "2048x1080" ;;
  4K | 2160) echo "3840x2160" ;;
  *) echo "$shorthand" ;; # Return as-is if not a shorthand
  esac
}

get_effective_max_resolution() {
  local requested_resolution=$1
  local system_resolution
  local lower_resolution

  system_resolution=$(get_display_resolution)
  debug "System resolution: $system_resolution"

  # debug "No resolution specified. Using system resolution: $system_resolution"
  lower_resolution=$(
    get_lowest_resolution \
      "$requested_resolution" \
      "$system_resolution"
  )

  if [[ "$lower_resolution" != "$requested_resolution" ]]; then
    warn "Requested resolution ($requested_resolution) is higher than system resolution ($system_resolution). Using system resolution."

    debug "Using resolution: $lower_resolution"
    echo "$lower_resolution"
  fi
}

calculate_resolution_area_calculate_resolution_area() {
  local resolution="$1"
  local width height
  width=$(echo "$resolution" | cut -d'x' -f1)
  height=$(echo "$resolution" | cut -d'x' -f2)
  echo $((width * height))
}

get_display_resolution_kde() {
  if ! command -v kscreen-doctor &>/dev/null; then
    exit 1
  fi

  display=$(kscreen-doctor -o | awk '
    /Output:/ {
        if (enabled && priority > max_priority) {
            max_priority = priority
            result = block
        }
        block = $0 "\n"
        enabled = 0
        priority = 0
    }
    /enabled/ { enabled = 1 }
    /priority/ { priority = $NF }
    { block = block $0 "\n" }
    END {
        if (enabled && priority > max_priority) {
            result = block
        }
        print result
    }
')

  resolution=$(echo -e "$display" | grep "Modes" | grep -o '[0-9]\+x[0-9]\+@[0-9]\+\*' | sed 's/@[0-9]\+\*//')
  rotation=$(echo -e "$display" | grep "Rotation:" | awk '{print $3}' | tr -cd '0-9' | tr -d '0' | cut -c1-)
  warn "$rotation"

  if [ $((rotation % 2)) -eq 0 ]; then
    echo "$resolution" | awk -F'x' '{print $2 "x" $1}'
  else
    echo "$resolution"
  fi
}

get_display_resolution_xorg() {
  if ! command -v kscreen-doctor &>/dev/null; then
    exit 1
  fi

  xrandr 2>/dev/null | awk '
    /connected/ {
        output = $1
        if ($2 == "primary") {
            primary = output
        }
        connected[output] = 1
    }
    /^[^ ]/ {
        current = $1
    }
    /\*/ {
        if (connected[current]) {
            match($0, /([0-9]+x[0-9]+)/, arr)
            if (arr[1] != "") {
                resolution[current] = arr[1]
            }
        }
    }
    END {
        if (primary != "" && resolution[primary] != "") {
            print resolution[primary]
        } else {
            for (out in connected) {
                if (resolution[out] != "") {
                    print resolution[out]
                    exit
                }
            }
        }
    }
  '
}

get_rotated_resolution() {
  local width=$1
  local height=$2
  local transform=$3

  case $transform in
  normal | 0 | 180)
    echo "${width}x${height}"
    ;;
  90 | 270)
    echo "${height}x${width}"
    ;;
  *)
    error "Unknown transform $transform"
    echo "${width}x${height}"
    ;;
  esac
}

get_display_resolution_hyprland() {
  local monitor_info

  if ! command -v hyprctl &>/dev/null; then
    exit 1
  fi

  monitor_info=$(hyprctl monitors -j | jq -r '.[0]')

  local width height transform
  width=$(echo "$monitor_info" | jq -r '.width')
  height=$(echo "$monitor_info" | jq -r '.height')
  transform=$(echo "$monitor_info" | jq -r '.transform')

  get_rotated_resolution "$width" "$height" "$transform"
}

get_display_refresh_rate_hyprland() {
  hyprctl monitors -j | jq -r '.[0].refreshRate' | awk '{printf "%.0f\n", $1}'
}

get_display_resolution() {
  local result
  local methods=(
    "get_display_resolution_hyprland"
    "get_display_resolution_kde"
    "get_display_resolution_xorg"
  )
  for method in "${methods[@]}"; do
    if type "$method" &>/dev/null; then
      result=$($method)
      if [[ -n "$result" && "$result" =~ ^[0-9]+x[0-9]+$ ]]; then
        echo "$result"
        return 0
      fi
    fi
  done
  warn "Error: Could not determine display resolution"
  return 1
}

get_display_refresh_rate() {
  local result

  # List of functions to try, in order of preference
  local methods=(
    "get_display_refresh_rate_hyprland"
    "get_display_refresh_rate_kde"
    "get_display_refresh_rate_xorg"
    # Add more methods here in the future
  )

  for method in "${methods[@]}"; do
    if type "$method" &>/dev/null; then
      result=$($method)
      if [[ -n "$result" && "$result" =~ ^[0-9]+$ ]]; then
        echo "$result"
        return 0
      fi
    fi
  done

  echo "Error: Could not determine refresh rate" >&2
  return 1
}

get_display_refresh_rate_kde() {
  kscreen-doctor -o 2>/dev/null | awk '
        /Output:/ {output=$2; connected=0; priority=-1}
        /connected/ {connected=1}
        /enabled/ {enabled=1}
        /priority/ {priority=$2}
        /Modes:/ && enabled==1 && connected==1 {
            if (priority > max_priority) {
                max_priority = priority
                match($0, /[0-9]+x[0-9]+@([0-9]+)\*/, arr)
                if (arr[1] != "") {
                    result = arr[1]
                }
            }
        }
        END {print result}
    '
}

get_display_refresh_rate_xorg() {
  xrandr 2>/dev/null | awk '
        /connected/ {
            output = $1
            if ($2 == "primary") {
                primary = output
            }
            connected[output] = 1
        }
        /^[^ ]/ {
            current = $1
        }
        /\*/ {
            if (connected[current]) {
                match($0, /([0-9.]+)\*/, arr)
                if (arr[1] != "") {
                    rate[current] = arr[1]
                }
            }
        }
        END {
            if (primary != "" && rate[primary] != "") {
                printf "%.0f\n", rate[primary]
            } else {
                for (out in connected) {
                    if (rate[out] != "") {
                        printf "%.0f\n", rate[out]
                        exit
                    }
                }
            }
        }
    '
}
