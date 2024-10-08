#!/usr/bin/env bash

######
# Main
######

###
# @brief Limits the maximum display values based on system capabilities.
#
# @param max_resolution_set Whether a max resolution is set
# @param resolution_set The set resolution
# @param shorthand_res_set The shorthand resolution set
# @param max_resolution The maximum resolution
# @param max_fps_set Whether a max FPS is set
# @param max_fps The maximum FPS
#
# @return A string containing the effective max resolution and max FPS
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

#######################
# Resolution Functions
#######################

# @brief Determines the effective maximum resolution based on system capabilities.
#
# @param requested_resolution The requested maximum resolution
#
# @return The effective maximum resolution
get_effective_max_resolution() {
  local requested_resolution=$1
  local system_resolution
  local lower_resolution

  system_resolution=$(get_display_resolution)
  debug "System resolution: $system_resolution"

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

# @brief Compares two resolutions and returns the one with the lower area.
#
# @param res1 First resolution in format "widthxheight"
# @param res2 Second resolution in format "widthxheight"
#
# @return The resolution with the lower area
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

# @brief Calculates the area of a given resolution.
#
# @param resolution The resolution in "widthxheight" format
#
# @return The area of the resolution (width * height)
calculate_resolution_area_calculate_resolution_area() {
  local resolution="$1"
  local width height

  width=$(echo "$resolution" | cut -d'x' -f1)
  height=$(echo "$resolution" | cut -d'x' -f2)

  echo $((width * height))
}

# @brief Converts shorthand resolution notation to full "widthxheight" format.
#
# @param shorthand The shorthand resolution notation
#
# @return The full resolution in "widthxheight" format
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

# @brief Converts full resolution to shorthand notation if possible.
#
# @param resolution The full resolution in "widthxheight" format
#
# @return The shorthand notation or the original resolution if no shorthand exists
convert_resolution_to_shorthand() {
  local resolution=$1

  case $resolution in
  "640x360") echo "360p" ;;
  "854x480") echo "480p" ;;
  "960x540") echo "540p" ;;
  "1600x900") echo "900p" ;;
  "1280x720") echo "720p" ;;
  "1920x1080") echo "1080p" ;;
  "2560x1440") echo "1440p" ;;
  "2048x1080") echo "2K" ;;
  "3840x2160") echo "4K" ;;
  *) echo "$resolution" ;; # Return as-is if not a known resolution
  esac
}

#######################
# FPS Functions
#######################

# @brief Determines the effective maximum FPS based on system capabilities.
#
# @param current_max_fps The current maximum FPS setting
#
# @return The effective maximum FPS
get_effective_max_fps() {
  local current_max_fps=$1
  local display_fps

  display_fps="$(get_display_refresh_rate)"
  debug "System refresh rate: $display_fps"

  local lower_fps
  lower_fps=$(get_lowest_value "$current_max_fps" "$display_fps")

  if [[ "$lower_fps" != "$current_max_fps" ]]; then
    warn "Requested FPS ($current_max_fps) is higher than system refresh rate ($display_fps). Using system refresh rate."
  fi

  debug "Using FPS: $lower_fps"
  echo "$lower_fps"
}

#######################
# Utility Functions
#######################

# @brief Returns the lower of two values.
#
# @param x First value
# @param y Second value
#
# @return The lower of the two input values
get_lowest_value() {
  local x="$1"
  local y="$2"

  if ((x <= y)); then
    echo "$x"
  else
    echo "$y"
  fi
}

#######################
# Display Information Functions
#######################

# @brief Retrieves the display resolution using available methods.
#
# @return The display resolution in "widthxheight" format, or exits with 1 if unsuccessful
get_display_resolution() {
  local result
  local methods=(
    "get_display_resolution_hyprland"
    "get_display_resolution_xrandr"
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

# @brief Retrieves the display refresh rate using available methods.
#
# @return The display refresh rate as an integer, or exits with 1 if unsuccessful
get_display_refresh_rate() {
  local result

  # List of functions to try, in order of preference
  local methods=(
    "get_display_refresh_rate_hyprland"
    "get_display_refresh_rate_xrandr"
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

#############################
# Hyprland-specific Functions
#############################

# @brief Checks if Hyprland is running.
#
# @return 0 if Hyprland is running, 1 otherwise
is_hyprland_running() {
  pgrep -f hyprland >/dev/null
}

# @brief Retrieves monitor information for Hyprland environments.
#
# @return JSON object containing monitor information
get_monitor_info_hyprland() {
  active_monitor=$(hyprctl activewindow -j | jq -r '.monitor')
  hyprctl monitors -j | jq -r ".[] | select(.id == $active_monitor)"
}

# @brief Retrieves the display resolution for Hyprland environments.
#
# @return The display resolution in "widthxheight" format, or exits with 1 if unsuccessful
get_display_resolution_hyprland() {
  if ! is_hyprland_running; then
    exit 1
  fi

  local monitor_info width height transform

  monitor_info=$(get_monitor_info_hyprland)
  width=$(echo "$monitor_info" | jq -r '.width')
  height=$(echo "$monitor_info" | jq -r '.height')
  transform=$(echo "$monitor_info" | jq -r '.transform')

  get_rotated_resolution_hyprland "$width" "$height" "$transform"
}

# @brief Calculates the rotated resolution based on the transform.
#
# @param width The original width
# @param height The original height
# @param transform The rotation transform (0, 90, 180, 270, or "normal")
#
# @return The rotated resolution in "widthxheight" format
get_rotated_resolution_hyprland() {
  local width=$1
  local height=$2
  local transform=$3

  case $transform in
  0 | 2)
    echo "${width}x${height}"
    ;;
  1 | 3)
    echo "${height}x${width}"
    ;;
  *)
    error "Unknown transform $transform"
    echo "${width}x${height}"
    ;;
  esac
}

# @brief Retrieves the display refresh rate for Hyprland environments.
#
# @return The display refresh rate as an integer
get_display_refresh_rate_hyprland() {
  if ! is_hyprland_running; then
    exit 1
  fi

  get_monitor_info_hyprland |
    jq -r .refreshRate |
    awk '{printf "%.0f\n", $1}'
}

#########
# xrandr
#########

_xrandr() {
  xrandr
}

# @brief Retrieves the display resolution for X.Org environments.
#
# @return The display resolution in "widthxheight" format, or exits with 1 if unsuccessful
get_display_resolution_xrandr() {
  _xrandr 2>/dev/null | awk '
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

# @brief Retrieves the display refresh rate for X.Org environments.
#
# @return The display refresh rate as an integer
get_display_refresh_rate_xrandr() {
  _xrandr 2>/dev/null | awk '
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
