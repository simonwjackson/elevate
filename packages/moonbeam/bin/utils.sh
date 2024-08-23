#!/usr/bin/env bash

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

# Helper function to convert bitrate values
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

# Helper function to convert latency values (remove 'ms' suffix if present)
convert_latency_value() {
  echo "${1%ms}" # Remove 'ms' suffix if present
}

set_config() {
  CONFIG[$1]="$2"
}

present_config() {
  local -n cfg=$1

  format_key() {
    local key="$1"
    # Capitalize first letter of each word and replace underscores with spaces
    echo "$key" | sed -e 's/_/ /g' -e 's/\b\(.\)/\u\1/g'
  }

  convert_to_mbps() {
    local kbps=$1
    echo $(((kbps + 500) / 1000))
  }

  # Function to round latency to the nearest integer
  round_latency() {
    local latency=$1
    printf "%.0f" "$latency"
  }

  # Function to handle empty or zero values
  format_value() {
    local key=$1
    local value=$2

    if [[ -z "$value" ]]; then
      echo "N/A"
    elif [[ "$value" -eq 0 ]]; then
      case "$key" in
      max_latency) echo "Unconstrained" ;;
      max_bitrate) echo "Dynamic (based on resolution and FPS)" ;;
      *) echo "Auto" ;;
      esac
    else
      case "$key" in
      max_latency) echo "$(round_latency "$value")ms" ;;
      max_bitrate) echo "$(convert_to_mbps "$value")Mbps" ;;
      *) echo "$value" ;;
      esac
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

        echo "* Resolution: $(format_value min_resolution "${cfg[min_resolution]}") - $(format_value max_resolution "${cfg[max_resolution]}")"
        echo "* FPS: $(format_value min_fps "${cfg[min_fps]}") - $(format_value max_fps "${cfg[max_fps]}")"

        # Handle latency
        if [[ -n "${cfg[max_latency]}" || -z "${cfg[max_latency]}" ]]; then
          echo "* Max Latency: $(format_value max_latency "${cfg[max_latency]}")"
        fi

        # Handle bitrate
        if [[ -n "${cfg[max_bitrate]}" || -z "${cfg[max_bitrate]}" ]]; then
          echo "* Max Bitrate: $(format_value max_bitrate "${cfg[max_bitrate]}")"
        fi

        for key in "${!cfg[@]}"; do
          case "$key" in
          min_resolution | max_resolution | min_fps | max_fps | max_latency | max_bitrate) continue ;; # Skip items already displayed
          *) printf "* %s: %s\n" "$(format_key "$key")" "$(format_value "$key" "${cfg[$key]}")" ;;
          esac
        done | sort
      } | gum format
    )"
}
