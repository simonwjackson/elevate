#!/usr/bin/env bash

show_help() {
  cat <<EOF
Steam Proton Launcher.

Usage:
  $(basename "$0") --proton <proton_path> <appid>
  $(basename "$0") -h | --help

Options:
  --proton <proton_path>     Path to Proton
  --debug                    Enable debug output
  -h, --help                 Show this screen.

Arguments:
  <appid>                    Steam App ID
EOF
}

# Debug mode flag
DEBUG=0

# Simple argument parsing
if [[ $# -eq 0 ]]; then
  show_help
  exit 1
fi

debug_log() {
  if [[ $DEBUG -eq 1 ]]; then
    echo "🔍 DEBUG: $*" >&2
  fi
}

while [[ $# -gt 0 ]]; do
  case $1 in
  --proton)
    PROTON_PATH="$2"
    shift 2
    ;;
  --debug)
    DEBUG=1
    shift
    ;;
  -h | --help)
    show_help
    exit 0
    ;;
  *)
    if [[ -z $SteamAppId ]]; then
      SteamAppId="$1"
    else
      echo "Unexpected argument: $1"
      show_help
      exit 1
    fi
    shift
    ;;
  esac
done

if [[ -z $PROTON_PATH || -z $SteamAppId ]]; then
  echo "Error: Both --proton and <appid> are required."
  show_help
  exit 1
fi

export SteamAppId
export SteamGameId="${SteamAppId}"

# Set constant variables
STEAM_HOME="${HOME}/.steam/steam"
STEAM_HOME_APPS_PATH="${STEAM_HOME}/steamapps"
LIBRARY_FOLDERS_FILE="${HOME}/.local/share/Steam/steamapps/libraryfolders.vdf"
APPINFO_FILE="${HOME}/.local/share/Steam/appcache/appinfo.vdf"

check_steam_running() {
  if ! pgrep -x "steam" >/dev/null; then
    gum spin --spinner dot --title "Steam is not running. Starting Steam in silent mode..." -- sleep 5
    setsid steam -silent </dev/null &>/dev/null &
    sleep 5
  fi
}

check_steam_running

# Function to parse VDF file and find the correct library
find_library() {
  local appid="$1"
  local library_path=""
  local in_apps=false
  local current_path=""

  while IFS= read -r line; do
    if [[ $line =~ ^[[:space:]]*\"path\"[[:space:]]*\"(.*)\" ]]; then
      current_path="${BASH_REMATCH[1]}"
    elif [[ $line =~ ^[[:space:]]*\"apps\" ]]; then
      in_apps=true
    elif [[ $in_apps == true && $line =~ ^[[:space:]]*\"$appid\" ]]; then
      library_path="$current_path"
      break
    elif [[ $line == "}" && $in_apps == true ]]; then
      in_apps=false
    fi
  done <"$LIBRARY_FOLDERS_FILE"

  if [[ -z "$library_path" ]]; then
    gum style --foreground 1 "Error: Unable to find library for AppID $appid"
    exit 1
  fi

  echo "$library_path"
}

# Function to find the game's installation directory
find_game_dir() {
  local library="$1"
  local appid="$2"
  local manifest_file="${library}/steamapps/appmanifest_${appid}.acf"

  if [[ ! -f "$manifest_file" ]]; then
    gum style --foreground 1 "Error: Manifest file not found for AppID ${appid}"
    exit 1
  fi

  local install_dir
  install_dir=$(grep -oP '"installdir"\s+"\K[^"]+' "$manifest_file")
  echo "${library}/steamapps/common/${install_dir}"
}

# Function to find the game's executable from the manifest file
find_game_exe() {
  local library="$1"
  local appid="$2"
  local manifest_file="${library}/steamapps/appmanifest_${appid}.acf"
  local executable=""

  # Check if manifest file exists
  if [[ ! -f "$manifest_file" ]]; then
    gum style --foreground 1 "Error: Manifest file not found: ${manifest_file}"
    return 1
  fi

  # First, get the installdir from the manifest
  local installdir
  installdir=$(grep -Po '"installdir"\s*"\K[^"]*' "$manifest_file")
  if [[ -z "$installdir" ]]; then
    gum style --foreground 1 "Error: Could not find installdir in manifest"
    return 1
  fi

  # Construct the full app path
  local app_path="${library}/steamapps/common/${installdir}"
  if [[ ! -d "$app_path" ]]; then
    gum style --foreground 1 "Error: Game directory not found: ${app_path}"
    return 1
  fi

  # Try multiple methods to find the executable

  # Method 1: Parse the manifest file for the executable
  executable=$(awk -F'"' '
        /^[[:space:]]*"launch"/ {in_launch=1; next}
        in_launch && /^[[:space:]]*"[0-9]+"/ {in_config=1; next}
        in_launch && in_config && /executable/ {print $4; exit}
        /^[[:space:]]*}/ {if(in_config) in_config=0; else if(in_launch) in_launch=0}
    ' "$manifest_file")

  # Method 2: Look for .exe files in the game directory
  if [[ -z "$executable" ]]; then
    # First, try to find an exe with the same name as the installdir
    if [[ -f "${app_path}/${installdir}.exe" ]]; then
      executable="${installdir}.exe"
    else
      # Look for common executable names
      for exe in launcher.exe game.exe start.exe $(basename "${installdir}").exe; do
        if [[ -f "${app_path}/${exe}" ]]; then
          executable="$exe"
          break
        fi
      done
    fi
  fi

  # Method 3: Find all .exe files and try to identify the main one
  if [[ -z "$executable" ]]; then
    # Find all .exe files in the directory, excluding common utility executables
    local exe_files
    exe_files=$(find "$app_path" -maxdepth 2 -type f -name "*.exe" \
      ! -name "unins*.exe" \
      ! -name "*crash*.exe" \
      ! -name "*update*.exe" \
      ! -name "redist*.exe" \
      ! -name "UnityCrash*.exe" \
      -printf "%P\n" | sort) # Using %P instead of %f to include subdirectory

    if [[ $DEBUG -eq 1 ]]; then
      echo "🔍 DEBUG: Found executables:" >&2
      echo "$exe_files" | sed 's/^/🔍 DEBUG: /' >&2
    fi

    # If there's only one exe, use that
    if [[ $(echo "$exe_files" | wc -l) -eq 1 ]]; then
      executable="$exe_files"
    # If there are multiple exes, try to find the most likely main one
    elif [[ -n "$exe_files" ]]; then
      # Look for executables with common main program patterns
      while IFS= read -r exe; do
        if [[ "${exe,,}" =~ (game|start|launch|bin|main|play|run|client) ]]; then
          executable="$exe"
          break
        fi
      done <<<"$exe_files"

      # If still not found, use the largest executable
      if [[ -z "$executable" ]]; then
        executable=$(find "$app_path" -maxdepth 2 -type f -name "*.exe" \
          ! -name "unins*.exe" \
          ! -name "*crash*.exe" \
          ! -name "*update*.exe" \
          ! -name "redist*.exe" \
          ! -name "UnityCrash*.exe" \
          -printf "%s %P\n" | sort -nr | head -n1 | cut -d' ' -f2-)
      fi
    fi
  fi

  if [[ -z "$executable" ]]; then
    gum style --foreground 1 "Error: Unable to find executable for app ${appid}"
    return 1
  fi

  # Verify the executable exists
  if [[ ! -f "${app_path}/${executable}" ]]; then
    gum style --foreground 1 "Error: Found executable name but file does not exist: ${app_path}/${executable}"
    return 1
  fi

  echo "$executable"
  return 0
}

# Print debug environment info
debug_log "Environment variables:"
debug_log "STEAM_HOME=$STEAM_HOME"
debug_log "STEAM_HOME_APPS_PATH=$STEAM_HOME_APPS_PATH"
debug_log "LIBRARY_FOLDERS_FILE=$LIBRARY_FOLDERS_FILE"
debug_log "APPINFO_FILE=$APPINFO_FILE"

# Find the correct Steam library
STEAM_GAME_LIBRARY=$(find_library "$SteamAppId")
gum style --foreground 4 "Using Steam library: $STEAM_GAME_LIBRARY"

# Find game directory and executable
APP_PATH=$(find_game_dir "$STEAM_GAME_LIBRARY" "$SteamAppId")
debug_log "Game directory: $APP_PATH"

APP_EXEC=$(find_game_exe "$STEAM_GAME_LIBRARY" "$SteamAppId")
debug_log "Game executable: $APP_EXEC"

APP_EXEC_FULL_PATH="${APP_PATH}/${APP_EXEC}"
debug_log "Full executable path: $APP_EXEC_FULL_PATH"

# Export required variables
export STEAM_COMPAT_CLIENT_INSTALL_PATH="${STEAM_GAME_LIBRARY}/steamapps"
export STEAM_COMPAT_DATA_PATH="${STEAM_GAME_LIBRARY}/steamapps/compatdata/${SteamAppId}"

# Check for compatdata directory and create base structure if missing
if [[ ! -d "${STEAM_COMPAT_DATA_PATH}" ]] || [[ ! -d "${STEAM_COMPAT_DATA_PATH}/pfx" ]]; then
  gum style \
    --border double \
    --border-foreground 3 \
    --padding "1 2" \
    --margin 1 \
    "Compatibility data not found for this game!" \
    "Please follow these steps:" \
    "1. Open Steam" \
    "2. Right-click the game" \
    "3. Select Properties" \
    "4. Under Compatibility, check 'Force the use of a specific Steam Play compatibility tool'" \
    "5. Launch the game once through Steam" \
    "6. Close the game" \
    "7. Try running this launcher again"

  if gum confirm "Would you like to open Steam to the game's properties?" --affirmative="Yes" --negative="No"; then
    steam "steam://nav/games/details/${SteamAppId}"
    gum style --foreground 3 "Steam should now be open to the game's page." \
      "Please right-click the game and select Properties to continue setup."
  fi
  exit 1
fi

# Proton executable
PROTON_EXEC="${PROTON_PATH}/proton"

# Change to the application directory
exec_dir=$(dirname "${APP_PATH}/${APP_EXEC}")
debug_log "Changing to executable directory: $exec_dir"
if ! cd "${exec_dir}"; then
  gum style --foreground 1 "Error: Unable to change to directory ${exec_dir}"
  exit 1
fi

# Ensure base directory structure exists
mkdir -p "${STEAM_COMPAT_DATA_PATH}/pfx"

# Debug launch info
debug_log "Launch configuration:"
debug_log "STEAM_COMPAT_CLIENT_INSTALL_PATH=$STEAM_COMPAT_CLIENT_INSTALL_PATH"
debug_log "STEAM_COMPAT_DATA_PATH=$STEAM_COMPAT_DATA_PATH"
debug_log "PROTON_EXEC=$PROTON_EXEC"
debug_log "Working directory: $(pwd)"
debug_log "Launch command: steam-run \"${PROTON_EXEC}\" run \"${APP_EXEC_FULL_PATH}\""

# Run the game
gum spin --spinner dot --title "Launching game..." -- sleep 2
if ! steam-run "${PROTON_EXEC}" run "${APP_EXEC_FULL_PATH}"; then
  gum style --foreground 1 "Error: Failed to launch the game"
  exit 1
fi
