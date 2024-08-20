#!/usr/bin/env bash

show_help() {
  cat <<EOF
Game Launcher

Usage:
  $(basename "$0") [options] launch [<game-id> [<profile>]]
  $(basename "$0") [options] list [--json] [--page-size=<size>] [--cursor=<cursor>]
  $(basename "$0") [options] (kill|stop|close)
  $(basename "$0") -h | --help

Options:
  -h, --help             Show this screen.
  --dry-run              Print the command that would be executed without actually running it.
  --debug                Print debug information during execution.
  --json                 Output the list in JSON format.
  --page-size=<size>     Number of items per page for list command [default: 10].
  --cursor=<cursor>      Cursor for pagination in list command.
EOF
}

# Initialize variables
COMMAND=""
GAME_ID=""
PROFILE=""
DRY_RUN=false
DEBUG=false
JSON=false
PAGE_SIZE=10
CURSOR=""
RUNNER_CMD=runner
TDP_CMD=tdp

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
  -h | --help)
    show_help
    exit 0
    ;;
  --dry-run)
    DRY_RUN=true
    shift
    ;;
  --debug)
    DEBUG=true
    shift
    ;;
  --json)
    JSON=true
    shift
    ;;
  --page-size*)
    if [[ "$1" == *=* ]]; then
      PAGE_SIZE="${1#*=}"
    else
      PAGE_SIZE="$2"
      shift
    fi
    shift
    ;;
  --cursor*)
    if [[ "$1" == *=* ]]; then
      CURSOR="${1#*=}"
    else
      CURSOR="$2"
      shift
    fi
    shift
    ;;
  launch | list | kill | stop | close)
    COMMAND="$1"
    shift
    ;;
  *)
    if [[ -z "$GAME_ID" && "$COMMAND" == "launch" ]]; then
      GAME_ID="$1"
    elif [[ -z "$PROFILE" && "$COMMAND" == "launch" ]]; then
      PROFILE="$1"
    else
      echo "Unknown argument: $1" >&2
      exit 1
    fi
    shift
    ;;
  esac
done

# Add this function to read the config file once
read_config_file() {
  local config_file="$1"
  if [ ! -f "$config_file" ]; then
    echo "Config file not found: $config_file" >&2
    exit 1
  fi
  yq eval '... comments=""' "$config_file"
}

# Add this variable at the beginning of the script, after parsing arguments
CONFIG_DATA=""

get_config_file_path() {
  # Check if CONFIG environment variable is set
  if [ -n "$CONFIG" ]; then
    echo "$CONFIG"
    return
  fi

  # Use XDG_CONFIG_HOME if set, otherwise fall back to ~/.config
  local config_dir="${XDG_CONFIG_HOME:-$HOME/.config}"
  echo "$config_dir/elevate/games.yaml"
}

DATA_FILE=$(get_config_file_path)

yq_games_no_comments() {
  yq '... comments=""' <(echo -e "$DATA_FILE")
}

ensure_config_file() {
  local config_dir
  config_dir=$(dirname "$DATA_FILE")

  # Create the config directory if it doesn't exist
  mkdir -p "$config_dir" 2>/dev/null || {
    gum error "Failed to create config directory: $config_dir"
    exit 1
  }

  # Touch the config file if it doesn't exist
  if [ ! -f "$DATA_FILE" ]; then
    touch "$DATA_FILE" 2>/dev/null || {
      gum error "Failed to create config file: $DATA_FILE"
      exit 1
    }
  fi

  # Check if the file is readable and writable
  if [ ! -r "$DATA_FILE" ] || [ ! -w "$DATA_FILE" ]; then
    gum error "Config file is not accessible: $DATA_FILE"
    exit 1
  fi
}

ensure_config_file

debug() {
  local message="$1"
  shift

  if [ "$DEBUG" = true ]; then
    gum log --structured --level debug "$message" "$@"
  fi
}

get_profile_index() {
  local game_id="$1"
  local profile_name="$2"

  debug "Searching for profile name: '$profile_name' for game: '$game_id'"

  if yq e ".profiles[\"$game_id\"][\"$profile_name\"]" "$DATA_FILE" | grep -q "null"; then
    debug "Profile name not found: '$profile_name'"
    return 1
  fi

  debug "Found profile: $profile_name"
  echo "$profile_name"
  return 0
}

get_profile_value() {
  local game_id="$1"
  local platform="$2"
  local key="$3"
  local profile_name="$4"
  local game_profile_value
  local launcher_profile_value

  debug "Getting profile value for game_id: '$game_id', platform: '$platform', key: '$key', profile_name: '$profile_name'"

  if [ -n "$profile_name" ]; then
    # Use game-specific profile if name is provided
    game_profile_value=$(yq e ".profiles[\"$game_id\"][\"$profile_name\"].$key" "$DATA_FILE")
    if [ "$game_profile_value" != "null" ]; then
      debug "Using game-specific profile value: '$game_profile_value'"
      echo "$game_profile_value"
      return
    fi
  fi

  # Use launcher's default profile value
  launcher_profile_value=$(yq e ".launchers[\"$platform\"].profile.$key" "$DATA_FILE")
  if [ "$launcher_profile_value" = "null" ]; then
    launcher_profile_value=$(yq e ".launchers.profile.$key" "$DATA_FILE")
  fi
  debug "Using launcher profile value: '$launcher_profile_value'"
  echo "$launcher_profile_value"
}

get_gamescope_args() {
  local game_object="$1"
  local gamescope_enabled
  local gamescope_args=""

  debug "Getting gamescope args"

  gamescope_enabled=$(yq e ".profile.gamescope" <(echo -e "$game_object"))

  if [ "$gamescope_enabled" = "false" ]; then
    debug "Gamescope is explicitly disabled for this game"
    echo "disabled"
    return
  fi

  # Declare an associative array to store the key-value pairs
  declare -A gamescope_options

  # Read the key-value pairs into the associative array
  while IFS="=" read -r key value; do
    if [ -n "$key" ]; then
      gamescope_options["$key"]="$value"
    fi
  done < <(yq e '.profile.gamescope | to_entries | .[] | .key + "=" + (.value | tostring)' <(echo -e "$game_object"))

  # Initialize the final gamescope_args string
  gamescope_args=""

  # Construct the gamescope_args string based on the associative array
  for key in "${!gamescope_options[@]}"; do
    value="${gamescope_options[$key]}"
    case "$key" in
    force-windows-fullscreen | borderless | fullscreen)
      [ "$value" = "true" ] && gamescope_args+=" --$key"
      ;;
    *)
      gamescope_args+=" --$key $value"
      ;;
    esac
  done

  # Trim leading whitespace from gamescope_args
  gamescope_args="${gamescope_args#"${gamescope_args%%[![:space:]]*}"}"

  echo "$gamescope_args"
}

configure_mangohud() {
  local mangohud_value="$1"
  local config_file="$HOME/.config/MangoHud/MangoHud.conf"
  local original_fps_limit

  # Store the original fps_limit
  original_fps_limit=$(grep '^fps_limit=' "$config_file" | cut -d'=' -f2)
  debug "Original fps_limit: $original_fps_limit"

  if [ "$mangohud_value" = "true" ]; then
    sed -i 's/^fps_limit=.*/fps_limit=0/' "$config_file"
  elif [[ "$mangohud_value" =~ ^fps:[[:space:]]*([0-9]+)$ ]]; then
    local fps_limit="${BASH_REMATCH[1]}"
    sed -i "s/^fps_limit=.*/fps_limit=$fps_limit/" "$config_file"
  fi

  echo "$original_fps_limit"
}

get_tdp_limit() {
  local game_object="$1"
  local tdp_limit

  tdp_limit=$(yq e ".profile.tdp.limit // null" <(echo -e "$game_object"))

  # Check if tdp_limit is a non-negative number and round it
  if [[ "$tdp_limit" =~ ^[0-9]+(\.[0-9]+)?$ ]] && (($(echo "$tdp_limit >= 0" | bc -l))); then
    printf "%.0f" "$tdp_limit"
  else
    # Log a warning for any input that results in "false"
    case "$tdp_limit" in
    null)
      gum log --level info "TDP limit is not set."
      ;;
    false)
      gum log --level info "TDP limit is not set."
      ;;
    *)
      gum log --level warn "TDP limit '$tdp_limit' is not a valid non-negative number."
      ;;
    esac
    return
  fi
}

get_tdp_boost() {
  local game_object="$1"

  local boost_limit
  local boost_seconds

  boost_limit=$(yq e '.profile.tdp.boost.limit // ""' <(echo -e "$game_object"))
  boost_seconds=$(yq e '.profile.tdp.boost.seconds // ""' <(echo -e "$game_object"))
  # Return values as an associative array
  declare -A boost
  boost[limit]=$boost_limit
  boost[seconds]=$boost_seconds

  declare -p boost
}

# New function to build the runner command string
build_runner_command() {
  local current_tdp="$1"
  echo "$RUNNER_CMD --after '$TDP_CMD $current_tdp' --"
}

handle_tdp_setting() {
  local tdp_limit="$1"
  local boost_limit="$2"
  local boost_seconds="$3"
  local current_tdp="$4"

  if [ -z "$tdp_limit" ] && [ -z "$boost_limit" ]; then
    debug "TDP handling is disabled or not configured."
    return
  fi

  local target_tdp="${tdp_limit:-$current_tdp}"

  debug "TDP Settings" current "$current_tdp" target "$target_tdp" boost_limit "$boost_limit" boost_seconds "$boost_seconds"

  if [ -n "$boost_limit" ] && [ -n "$boost_seconds" ]; then
    debug "Initiating TDP Boost" limit "$boost_limit" duration "${boost_seconds}s" game_tdp "$target_tdp"

    if [ "$DRY_RUN" != "true" ]; then
      # Set initial boost TDP
      debug "Setting Boost TDP" value "$boost_limit"
      eval "$TDP_CMD $boost_limit" >/dev/null 2>&1 &
      debug "Boost TDP set" value "$boost_limit"

      # Schedule the target TDP setting after boost_seconds
      (
        debug "Starting boost duration sleep" seconds "$boost_seconds"
        sleep "$boost_seconds"
        debug "Boost duration sleep completed" seconds "$boost_seconds"

        debug "Setting post-boost TDP" value "$target_tdp"
        eval "$TDP_CMD $target_tdp" >/dev/null 2>&1
        debug "Post-boost TDP set" value "$target_tdp"
      ) &
      debug "Boost sequence initiated"
    else
      debug "Dry run: Boost sequence not executed" boost_limit "$boost_limit" boost_duration "${boost_seconds}s" post_boost "$target_tdp"
    fi
  elif [ "$target_tdp" != "$current_tdp" ]; then
    debug "Setting Game TDP" current "$current_tdp" target "$target_tdp"

    if [ "$DRY_RUN" != "true" ]; then
      eval "$TDP_CMD $target_tdp" >/dev/null 2>&1 &
      debug "Game TDP set" value "$target_tdp"
    else
      debug "Dry run: Game TDP not set" target "$target_tdp"
    fi
  else
    debug "No TDP changes needed" current "$current_tdp" target "$target_tdp"
  fi
}

### GAME OBJECTS

merge_game_objects() {
  yq eval "
    (.games[\"${GAME_ID}\"] // {}) *
    (.system.games[\"${GAME_ID}\"] // {})
    " <(echo -e "$CONFIG_DATA")
}

get_platform() {
  local merged_game="$1"
  echo -e "$merged_game" | yq eval '.platform' -
}

extract_profile() {
  local merged_game="$1"

  if [ "$PROFILE" = "_launcher" ] || [ "$PROFILE" = "_system" ]; then
    echo -e "$merged_game" | yq eval "
       del(.profiles)
    "
  else
    yq '... comments=""' <(echo -e "$merged_game") | yq eval "
      . * {\"profile\": .profiles[\"${PROFILE}\"]} |
      del(.profiles)
    "
  fi
}

get_base_profile() {
  local platform="$1"

  if [ "$PROFILE" = "_system" ]; then
    yq eval "
      .system.profile // {}
    " <(echo -e "$CONFIG_DATA")
  else
    yq eval "
      (.system.profile // {}) *
      (.launchers[\"${platform}\"].profile // {})
    " <(echo -e "$CONFIG_DATA")
  fi
}

merge_profiles() {
  local base_profile="$1"
  local game_profile="$2"
  yq eval-all 'select(fileIndex == 0) * select(fileIndex == 1)' \
    <(echo -e "$base_profile") <(echo -e "$game_profile")
}

create_final_game() {
  local game="$1"
  local profile="$2"
  yq eval-all '
        select(fileIndex == 0) * {"profile": select(fileIndex == 1)}
    ' <(echo -e "$game") <(echo -e "$profile")
}

get_game_object() {
  local merged_game
  merged_game=$(merge_game_objects)

  local platform
  platform=$(get_platform "$merged_game")

  local final_game
  final_game=$(extract_profile "$merged_game")

  local base_profile
  base_profile=$(get_base_profile "$platform")

  if [ "$PROFILE" = "_launcher" ] || [ "$PROFILE" = "_system" ]; then
    create_final_game "$final_game" "$base_profile"
  else
    local game_profile
    game_profile=$(echo -e "$final_game" | yq eval '.profile // {}' -)

    local final_profile
    final_profile=$(merge_profiles "$base_profile" "$game_profile")

    create_final_game "$final_game" "$final_profile"
  fi
}

list_games() {
  local page_size="$PAGE_SIZE"
  local cursor="$CURSOR"
  local json_output="$JSON"

  # Convert YAML to JSON for easier processing
  local games_json
  games_json=$(yq eval -o=json '.games' <(echo -e "$CONFIG_DATA"))

  # Sort games by ID
  local sorted_games
  sorted_games=$(echo "$games_json" | jq 'to_entries | sort_by(.key)')

  # Apply pagination
  local total_count
  total_count=$(echo "$sorted_games" | jq 'length')

  local start_index=0
  if [ -n "$cursor" ]; then
    start_index=$(echo "$sorted_games" | jq --arg cursor "$cursor" 'map(.key == $cursor) | index(true) // 0')
  fi

  local end_index=$((start_index + page_size))
  local next_cursor=""

  if [ "$end_index" -lt "$total_count" ]; then
    next_cursor=$(echo "$sorted_games" | jq -r ".[$end_index].key")
  fi

  local paginated_games
  paginated_games=$(echo "$sorted_games" | jq --argjson start "$start_index" --argjson end "$end_index" '.[$start:$end]')

  if [ "$json_output" = "true" ]; then
    jq \
      -n \
      --compact-output \
      --monochrome-output \
      --argjson games "$paginated_games" \
      --arg next_cursor "$next_cursor" \
      '{data: $games | map(.value + {id: .key}), next_cursor: $next_cursor}'
  else
    echo "$paginated_games" | jq -r '.[] | "\(.key): \(.value.name)"'
    if [ -n "$next_cursor" ]; then
      echo "Next page cursor: $next_cursor"
    fi
  fi
}

launch_game() {
  local game_id="$1"
  local profile="$2"
  local uri
  local platform
  local launch_command
  local proton_path
  local gamemode_enabled
  local mangohud_value
  local gamescope_args
  local tdp_limit
  local original_fps_limit

  debug "Building launch command" game "$game_id" profile "$profile" >&2

  GAME_OBJECT=$(get_game_object "$game_id" "$profile")

  debug "Game object" game "$GAME_OBJECT"

  uri=$(yq e ".uri" <(echo -e "$GAME_OBJECT"))
  platform=$(yq e ".platform" <(echo -e "$GAME_OBJECT"))
  # TODO: GAME_OBJECT should include the launcher
  launch_command=$(yq eval ".launchers[\"$platform\"].command" <(echo -e "$CONFIG_DATA"))

  if [ -z "$uri" ] || [ "$uri" = "null" ]; then
    echo "Error: Game not found." >&2
    exit 1
  fi

  if [ -z "$platform" ] || [ "$platform" = "null" ]; then
    echo "Error: Platform not found: $platform" >&2
    exit 1
  fi

  if [ -z "$launch_command" ] || [ "$launch_command" = "null" ]; then
    echo "Error: Launcher command not found." >&2
    exit 1
  fi

  # Get profile values
  proton_path=$(yq e ".profile.proton" <(echo -e "$GAME_OBJECT"))
  gamemode_enabled=$(yq e ".profile.gamemode" <(echo -e "$GAME_OBJECT"))
  mangohud_value=$(yq e ".profile.mangohud" <(echo -e "$GAME_OBJECT"))
  gamescope_args=$(get_gamescope_args "$GAME_OBJECT")
  tdp_limit=$(get_tdp_limit "$GAME_OBJECT")
  eval "$(get_tdp_boost "$GAME_OBJECT")"

  debug "Extracted values" proton_path "$proton_path" gamemode_enabled "$gamemode_enabled" mangohud_value "$mangohud_value" tdp_limit "$tdp_limit"

  # Replace %proton% with the actual Proton path if it exists
  if [ -n "$proton_path" ] && [ "$proton_path" != "null" ]; then
    launch_command="${launch_command//%proton%/$proton_path}"
  fi

  # Replace %uri% with the actual game URI
  launch_command="${launch_command//%uri%/$uri}"

  # Handle TDP setting
  current_tdp=$(eval "$TDP_CMD")
  debug "Current TDP before changes" tdp "$current_tdp"
  tdp_runner_command=$(build_runner_command "$current_tdp")

  # Construct the final command with proper ordering
  final_command=""
  [ "$gamemode_enabled" = "true" ] && final_command+="gamemoderun "
  if [ "$gamescope_args" != "disabled" ] && [ -n "$gamescope_args" ]; then
    final_command+="gamescope $gamescope_args -- "
  fi
  if [ "$mangohud_value" = "true" ] || [[ "$mangohud_value" =~ ^fps: ]]; then
    original_fps_limit=$(configure_mangohud "$mangohud_value")
    final_command+="mangohud "
  fi
  final_command+="$tdp_runner_command $launch_command"

  if [ -n "$original_fps_limit" ]; then
    after_command='sed -i "/^fps_limit=/c\fps_limit=${original_fps_limit:-0}" "$HOME/.config/MangoHud/MangoHud.conf" 2>/dev/null || echo "fps_limit=${1:-0}" >> "$HOME/.config/MangoHud/MangoHud.conf"'
    final_command="${final_command/runner /runner --after \"$after_command\"}"
  fi

  debug "Final command" value "$final_command"
  debug "Launching" game "$game_id" profile "$profile" >&2

  handle_tdp_setting "$tdp_limit" "${boost[limit]}" "${boost[seconds]}" "$current_tdp" &

  if [ "$DRY_RUN" = "true" ]; then
    debug "Dry run mode: Final command not executed" command "$final_command"
    echo "Dry run mode: Command not executed"
  else
    debug "Executing final command" command "$final_command"
    eval "$final_command"
  fi
}

select_game() {
  local games_json
  local formatted_games
  local selected_index

  # Get games data and sort by ID
  games_json=$(yq eval -o=json '.games' <(echo -e "$CONFIG_DATA") | jq 'to_entries | sort_by(.key)')

  # Format games for display, preferring name over ID
  formatted_games=$(echo "$games_json" | jq -r 'to_entries | map(.value.value.name // .value.key) | to_entries | map("\(.key + 1). \(.value)") | .[]')

  # Use gum to select a game
  selected_index=$(echo "$formatted_games" | gum choose --limit 1 --header "Choose Game" | cut -d'.' -f1)

  # Return the game ID based on the selected index
  if [ -n "$selected_index" ]; then
    echo "$games_json" | jq -r --argjson idx "$((selected_index - 1))" '.[$idx].key'
  fi
}

select_profile() {
  local game_id="$1"
  local profiles_json
  local formatted_profiles
  local selected_index

  # Get profiles data for the game
  profiles_json=$(yq eval -o=json ".system.games[\"$game_id\"].profiles // {}" <(echo -e "$CONFIG_DATA") | jq 'to_entries | sort_by(.key)')

  formatted_profiles=$(echo "$profiles_json" | jq -r 'map(.value.name // .key) + ["Launcher Default"] + ["System Default"] | to_entries | map("\(.key + 1). \(.value)") | .[]')

  # Get total number of items
  total_items=$(echo "$formatted_profiles" | wc -l)

  # Use gum to select a profile
  selected_index=$(echo "$formatted_profiles" | gum choose --limit 1 --select-if-one --header "Choose Profile" | cut -d'.' -f1)

  # Return the profile name based on the selected index
  if [ -n "$selected_index" ]; then
    if [ "$selected_index" -eq "$total_items" ]; then
      echo "_system"
    elif [ "$selected_index" -eq "$((total_items - 1))" ]; then
      echo "_launcher"
    else
      echo "$profiles_json" | jq -r --argjson idx "$((selected_index - 2))" '.[$idx].key'
    fi
  fi
}

close_running_game() {
  local pid_file="$XDG_RUNTIME_DIR/elevate/pid"

  if [ ! -f "$pid_file" ]; then
    echo "No running game found." >&2
    return 1
  fi

  local pid
  pid=$(cat "$pid_file")

  if ! ps -p "$pid" >/dev/null; then
    echo "Process with PID $pid not found. Removing stale PID file." >&2
    rm "$pid_file"
    return 1
  fi

  debug "Closing game with PID $pid"

  if [ "$DRY_RUN" = "true" ]; then
    echo "Dry run mode: Would send SIGTERM to process $pid"
  else
    kill -TERM "$pid"
    for i in {1..10}; do
      if ! ps -p "$pid" >/dev/null; then
        echo "Game closed successfully."
        return 0
      fi
      sleep 1
    done

    echo "Game did not close after 10 seconds. Sending SIGKILL." >&2
    kill -KILL "$pid"
    rm "$pid_file"
  fi
}

main() {
  gum log info "Loading configuration from $DATA_FILE"
  CONFIG_DATA=$(read_config_file "$DATA_FILE")
  gum log info "Configuration loaded from $DATA_FILE"

  case "$COMMAND" in
  launch)
    launch_command
    ;;
  list)
    list_games
    ;;
  kill | stop | close)
    close_running_game
    ;;
  *)
    echo "Invalid command. Use -h or --help for usage information." >&2
    exit 1
    ;;
  esac
}

launch_command() {
  [ -z "$GAME_ID" ] && GAME_ID=$(select_game)
  [ -z "$GAME_ID" ] && exit 1

  [ -z "$PROFILE" ] && PROFILE=$(select_profile "$GAME_ID")
  [ -z "$PROFILE" ] && exit 1

  launch_game "$GAME_ID" "$PROFILE"
}

main "$@"
