#!/usr/bin/env bash

##
# @file utils.sh
# @brief Utility functions for Moonbeam configuration and argument processing.
# @details This file contains various utility functions used for handling
# Moonbeam configuration, processing command-line arguments, and displaying
# configuration information.

##
# @brief Apply display limits to the configuration.
# @return 0 on success, 1 on failure.
# @details This function applies the maximum resolution and FPS limits
# to the current configuration.
apply_display_limits() {
  local streaming_params

  if ! streaming_params=$(
    limit_max_display_values \
      "${CONFIG[max_resolution_set]}" \
      "${CONFIG[resolution_set]}" \
      "${CONFIG[shorthand_res_set]}" \
      "${CONFIG[max_resolution]}" \
      "${CONFIG[max_fps_set]}" \
      "${CONFIG[max_fps]}"
  ); then
    return 1
  fi
  read -r CONFIG["max_resolution"] CONFIG["max_fps"] <<<"$streaming_params"
}

##
# @brief Convert command-line arguments to an associative array.
# @param args_array Name of the associative array to store the arguments.
# @return 0 on success, 1 on failure.
# @details This function processes command-line arguments and stores them
# in an associative array, handling both long and short options.
convert_args_to_assoc_array() {
  set -E # Enable error trapping
  trap 'error "Error on line $LINENO. Exit code: $?"' ERR

  local -n args_array=$1
  shift # Remove the first argument (the array name)

  local key
  local index=0

  trace "Starting convert_args_to_assoc_array with $# arguments"
  trace Bash version "$BASH_VERSION"

  while [[ $# -gt 0 ]]; do
    trace "Processing argument: $1"
    if [[ $1 == --* ]]; then
      key="${1#--}"
      key="${key//-/_}" # Convert dashes to underscores
      if [[ $# -eq 1 || $2 == -* ]]; then
        args_array["$key"]=true
        trace "Set ${key}=true"
      else
        args_array["$key"]=$2
        trace "Set ${key}=$2"
        shift
        trace "Shifted arguments. Remaining: $#"
      fi
    elif [[ $1 == -* ]]; then
      key="${1#-}"
      key="${key//-/_}" # Convert dashes to underscores
      if [[ $# -eq 1 || $2 == -* ]]; then
        args_array["$key"]=true
        trace "Set ${key}=true"
      else
        args_array["$key"]=$2
        trace "Set ${key}=$2"
        shift
        trace "Shifted arguments. Remaining: $#"
      fi
    else
      args_array["$index"]=$1
      trace "Set args_array[$index]=$1"
      trace "Current index value: $index"
      index=$((index + 1))
      if [[ ! "$index" =~ ^[0-9]+$ ]]; then
        trace ERROR "Index is not a valid integer after increment: $index"
        return 1
      fi
      trace "New index value: $index"
    fi
    shift
    trace "Shifted arguments. Remaining: $#"
  done

  trace "Finished convert_args_to_assoc_array"
  trap - ERR # Reset the error trap
  set +E     # Disable error trapping
  return 0
}

##
# @brief Convert bitrate values to a standardized format.
# @param value The bitrate value to convert.
# @return The converted bitrate value in Kbps.
# @details This function converts bitrate values from various formats
# (e.g., "5Mbps", "500Kbps") to a standardized Kbps value.
convert_bitrate_value() {
  local value="$1"
  local numeric_value

  # Remove 'Kbps' or 'Mbps' suffix if present
  if [[ "$value" =~ Mbps$ ]]; then
    numeric_value="${value%Mbps}"
    echo "$((numeric_value * 1000))"
  elif [[ "$value" =~ Kbps$ ]]; then
    numeric_value="${value%Kbps}"
    echo "$numeric_value"
  else
    echo "$value"
  fi
}

##
# @brief Convert latency values to a standardized format.
# @param value The latency value to convert.
# @return The converted latency value without the 'ms' suffix.
# @details This function removes the 'ms' suffix from latency values if present.
convert_latency_value() {
  echo "${1%ms}" # Remove 'ms' suffix if present
}

##
# @brief Set a configuration value.
# @param key The configuration key to set.
# @param value The value to set for the given key.
# @details This function sets a value in the CONFIG associative array.
set_config() {
  CONFIG[$1]="$2"
}

spin() {
  local speed=0.1
  local message="Waiting to finish.."
  local spinner_name="meter"
  local color="white"
  local pid=""

  # Parse command-line style arguments
  while [[ $# -gt 0 ]]; do
    case "$1" in
    --speed)
      speed="$2"
      shift 2
      ;;
    --message)
      message="$2"
      shift 2
      ;;
    --spinner)
      spinner_name="$2"
      shift 2
      ;;
    --color)
      color="$2"
      shift 2
      ;;
    *)
      pid="$1"
      shift
      ;;
    esac
  done

  if [[ -z "$pid" ]]; then
    echo "Error: PID not provided" >&2
    return 1
  fi

  declare -A spinners=(
    ["braille"]="⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏"
    ["meter"]="▁ ▂ ▃ ▄ ▅ ▆ ▇ █ ▇ ▆ ▅ ▄ ▃ ▁"
    ["circle"]="◐ ◓ ◑ ◒"
    ["square"]="◰ ◳ ◲ ◱ "
    ["dots"]="⠁ ⠂ ⠄ ⡀ ⢀ ⠠ ⠐ ⠈ "
    ["arrow"]="← ↖ ↑ ↗ → ↘ ↓ ↙ "
    ["triangles"]="◢ ◣ ◤ ◥ "
    ["clock"]="🕐 🕑 🕒 🕓 🕔 🕕 🕖 🕗 🕘 🕙 🕚 🕛 "
    ["moon"]="🌑 🌒 🌓 🌔 🌕 🌖 🌗 🌘 "
    ["line"]="┤ ┘ ┴ └ ├ ┌ ┬ ┐ "
    ["pipe"]="┃ ┃ ┃ ┃ ┃ "
    ["elipsis"]="⋯ \ "
    ["dot"]="⋅ \ "
    ["balloon"]=". o O @ *"
    ["bounce"]="⠁ ⠂ ⠄ ⠂ "
    ["box_bounce"]="▖ ▘ ▝ ▗ "
    ["star"]="✶ ✸ ✹ ✺ ✹ ✷ "
    ["toggle"]="⊶ ⊷ "
    ["arc"]="◜ ◠ ◝ ◞ ◡ ◟ "
    ["pixel"]="⣾ ⣽ ⣻ ⢿ ⡿ ⣟ ⣯ ⣷ "
    ["spiral"]="◇ ◈ ◆ ◈ "
    ["grow_horizontal"]="▏ ▎ ▍ ▌ ▋ ▊ ▉ ▊ ▋ ▌ ▍ ▎ "
    ["noise"]="▓ ▒ ░ ▒ ▓ "
    ["dots_wave"]="⠁ ⠂ ⠄ ⠆ ⠇ ⠃ ⠁ ⠂ ⠄ ⠆ ⠇ ⠃ "
    ["dots_bounce"]="⠁ ⠁ ⠉ ⠙ ⠚ ⠒ ⠂ ⠂ ⠒ ⠲ ⠴ ⠤ ⠄ ⠄ ⠤ ⠠ ⠠ ⠤ ⠦ ⠖ ⠒ ⠐ ⠐ ⠒ ⠓ ⠋ ⠉ ⠈ ⠈ "
    ["hamburger"]="≡ \\ ≡ / "
    ["grenade"]="،҉ ︵ ‿ ︵ "
    ["layer"]="─ ≡ ≡ ⨯ ≡ ≡ ─ "
    ["betawave"]="ρ β σ α "
    ["fingerDance"]="🤘 🤟 🖖 🤚 🤙 "
    ["fistBump"]="🤜　　　　🤛 🤜　　　🤛 🤜　　🤛 🤜　🤛 🤜🤛"
    ["mindblown"]="🧠 🌪️ 💥 ✨ 🤯"
    ["speaker"]="🔈 🔉 🔊 🔉"
    ["flag"]="🏳️ 🏴 🏳️ 🏴"
    ["orange_pulse"]="🔸 🔶 🟠 🟧 🟠 🔶"
    ["blue_pulse"]="🔹 🔷 🔵 🟦 🔵 🔷"
    ["aesthetic"]="▰▱ ▱▰"
    ["dqpb"]="d q p b"
    ["weather"]="⛅️ 🌧️ 🌩️ 🌨️"
    ["line"]="─ \  ─ \  ─"
    ["minidot"]="⠋ ⠙ ⠹ ⠸ ⠼ ⠴ ⠦ ⠧ ⠇ ⠏"
    ["jump"]="⢄ ⢂ ⢁ ⡁ ⡈ ⡐ ⡠"
    ["pulse"]="█ ▓ ▒ ░"
    ["points"]="∙∙∙ ∙∙· ∙·· ···"
    ["globe"]="🌍 🌎 🌏"
    ["monkey"]="🙈 🙉 🙊"
    ["meter"]="▱▱▱ ▰▱▱ ▰▰▱ ▰▰▰"
    ["hamburger"]="☱ ☲ ☴"
    ["classic"]="- \\ | /"
    ["line"]="─ ╾ ╼"
    ["minidot"]="⠋ ⠙ ⠹ ⠸ ⠼ ⠴ ⠦ ⠧ ⠇ ⠏"
  )

  declare -A colors=(
    ["black"]="30"
    ["red"]="31"
    ["green"]="32"
    ["yellow"]="33"
    ["blue"]="34"
    ["magenta"]="35"
    ["cyan"]="36"
    ["white"]="37"
  )

  IFS=" " read -r -a spinner_frames <<<"${spinners[$spinner_name]}"
  if [[ ${#spinner_frames[@]} -eq 0 ]]; then
    echo "Invalid spinner name. Using classic spinner." >&2
    IFS=" " read -r -a spinner_frames <<<"${spinners[meter]}"
  fi

  local color_code="${colors[$color]}"
  if [[ -z "$color_code" ]]; then
    echo "Invalid color. Using default (white)." >&2
    color_code="${colors[white]}"
  fi

  local frame_count=${#spinner_frames[@]}
  local i=0

  tput civis >&2 # Hide cursor
  trap 'tput cnorm >&2; exit' INT TERM EXIT

  sleep 0.2 # Wait a bit to allow the info message to be printed

  while kill -0 "$pid" 2>/dev/null; do
    printf "\r%-*s" $((${#message} + ${#spinner_frames[0]} + 1)) "" >&2 # Clear the entire line
    printf "\r%s \033[%sm%s\033[0m" "$message" "$color_code" "${spinner_frames[i]}" >&2
    i=$(((i + 1) % frame_count))
    sleep "$speed"
  done

  printf "\r%-*s\r" $((${#message} + ${#spinner_frames[0]} + 1)) "" >&2 # Clear the entire line
  tput cnorm >&2                                                        # Show cursor
}

await() {
  local spin_args=()
  local command=""
  local args=()

  # Collect arguments for spin and find the command
  while [[ $# -gt 0 ]]; do
    case "$1" in
    --)
      shift
      command="$1"
      shift
      args=("$@")
      break
      ;;
    *)
      spin_args+=("$1")
      shift
      ;;
    esac
  done

  if [[ -z "$command" ]]; then
    echo "No command specified" >&2
    return 1
  fi

  local output_pipe="/tmp/output_pipe_$$"
  local error_pipe="/tmp/error_pipe_$$"
  local progress_pipe="/tmp/progress_pipe_$$"
  mkfifo "$output_pipe"
  mkfifo "$error_pipe"
  mkfifo "$progress_pipe"

  # Start the command and redirect its output to the output pipe and errors to the error pipe
  ("$command" "${args[@]}" >"$output_pipe" 2>"$error_pipe") &
  local cmd_pid=$!

  # Start the progress indicator
  (
    spin "${spin_args[@]}" "$cmd_pid" >&2
    echo "done" >"$progress_pipe"
  ) &

  # Read from the output pipe and pass it through
  cat "$output_pipe" &

  # Read from the error pipe and store errors
  errors=$(cat "$error_pipe")

  # Wait for both the command and the progress indicator to finish
  wait $cmd_pid
  cat "$progress_pipe" >/dev/null

  # Print stored errors
  if [[ -n "$errors" ]]; then
    echo "$errors" >&2
  fi

  # Clean up
  rm "$output_pipe" "$error_pipe" "$progress_pipe"
}

convert_to_mbps() {
  local kbps=$1

  if [[ "$kbps" =~ ^[0-9]+$ ]]; then
    echo $(((kbps + 500) / 1000))
  else
    echo "$kbps"
  fi
}

convert_bool() {
  local input=$1

  input=$(echo "$input" | tr '[:upper:]' '[:lower:]')
  case "$input" in
  true | t | yes | y | 1) echo "Yes" ;;
  false | f | no | n | 0) echo "No" ;;
  *) echo "Invalid input" ;;
  esac
}

present_config() {
  local -n cfg=$1
  local resolution=$2
  local fps=$3
  local bitrate=$4

  results=$({
    echo "# Moonbeam Configuration"
    echo
    echo "* $(convert_resolution_to_shorthand "$resolution") @ ${fps} fps"
    echo "* Bitrate: $(convert_to_mbps "$bitrate") Mbps"
    echo "* Reconnect: $(convert_bool "${cfg[reconnect]}")"
  } | gum format)

  gum style \
    --border normal \
    --margin "1 0" \
    --padding "0 1 1 0" \
    --border-foreground 212 "$results"
}

present_config_detail() {
  local -n cfg=$1
  local current_latency=$2
  local current_bandwidth=$3

  format_key() {
    local key="$1"
    # Capitalize first letter of each word and replace underscores with spaces
    echo "$key" | sed -e 's/_/ /g' -e 's/\b\(.\)/\u\1/g'
  }

  convert_to_mbps() {
    local kbps=$1
    if [[ "$kbps" =~ ^[0-9]+$ ]]; then
      echo $(((kbps + 500) / 1000))
    else
      echo "$kbps"
    fi
  }

  # Function to round latency to the nearest integer
  round_latency() {
    local latency=$1
    if [[ "$latency" =~ ^[0-9]+(\.[0-9]+)?$ ]]; then
      printf "%.0f" "$latency"
    else
      echo "$latency"
    fi
  }

  format_value() {
    local key=$1
    local value=$2

    if [[ -z "$value" ]]; then
      echo "N/A"
    elif [[ "$value" == "0" ]]; then
      case "$key" in
      max_latency) echo "Unconstrained" ;;
      max_bitrate) echo "Dynamic (based on resolution and FPS)" ;;
      *) echo "Auto" ;;
      esac
    else
      case "$key" in
      max_latency | current_latency)
        local rounded_latency
        rounded_latency=$(round_latency "$value")
        [[ "$rounded_latency" == "0" ]] && echo "<1" || echo "$rounded_latency"
        ;;
      max_bitrate | current_bitrate) convert_to_mbps "$value" ;;
      *) echo "$value" ;;
      esac
    fi
  }

  build_latency_line() {
    local latency=$1
    local max_latency=$2

    if [[ max_latency -ge 0 ]]; then
      echo "* Latency: ${latency}ms (Max: ${max_latency}ms)"
    else
      echo "* Latency: Unlimited"
    fi
  }

  gum style \
    --border normal \
    --margin "1 0" \
    --padding "0 1 1 0" \
    --border-foreground 212 \
    "$(
      {
        echo "# Moonbeam Configuration"
        echo

        echo "* Resolution: $(format_value min_resolution "${cfg[min_resolution]:-N/A}") - $(format_value max_resolution "${cfg[max_resolution]:-N/A}")"
        echo "* FPS: $(format_value min_fps "${cfg[min_fps]:-N/A}") - $(format_value max_fps "${cfg[max_fps]:-N/A}")"

        build_latency_line "$current_latency" "${cfg[max_latency]}"

        echo "* Bitrate: $(convert_to_mbps "$current_bandwidth")Mbps"

        for key in "${!cfg[@]}"; do
          case "$key" in
          min_resolution | max_resolution | min_fps | max_fps | max_latency | max_bitrate) continue ;; # Skip items already displayed
          *) printf "* %s: %s\n" "$(format_key "$key")" "$(format_value "$key" "${cfg[$key]}")" ;;
          esac
        done | sort
      } | gum format
    )"
}
