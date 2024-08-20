#!/usr/bin/env bash

show_help() {
  cat <<EOF
Steam Proton Launcher.

Usage:
  $(basename "$0") --proton <proton_path> <appid>
  $(basename "$0") -h | --help

Options:
  --proton <proton_path>     Path to Proton
  -h, --help                 Show this screen.

Arguments:
  <appid>                    Steam App ID
EOF
}

# Simple argument parsing
if [[ $# -eq 0 ]]; then
  show_help
  exit 1
fi

while [[ $# -gt 0 ]]; do
  case $1 in
  --proton)
    PROTON_PATH="$2"
    shift 2
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
    echo "Steam is not running. Starting Steam in silent mode..."
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
    echo "Error: Unable to find library for AppID $appid" >&2
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
    echo "Error: Manifest file not found for AppID ${appid}" >&2
    exit 1
  fi

  local install_dir
  install_dir=$(grep -oP '"installdir"\s+"\K[^"]+' "$manifest_file")
  echo "${library}/steamapps/common/${install_dir}"
}

# Function to find the game's executable
find_game_exe() {
  local app_path="$1"
  local executable

  executable=$(strings "$APPINFO_FILE" | awk -v app_path="$app_path" '
    $0 ~ app_path {
        while (getline) {
            if ($0 ~ /launch/) {
                while (getline) {
                    if ($0 ~ /executable/) {
                        getline
                        print
                        exit
                    }
                }
            }
        }
    }')

  if [[ -z "$executable" ]]; then
    echo "Error: Unable to find executable for AppID ${app_path}" >&2
    exit 1
  fi

  echo "$executable"
}

# Find the correct Steam library
STEAM_GAME_LIBRARY=$(find_library "$SteamAppId")
echo "Using Steam library: $STEAM_GAME_LIBRARY"

# Find game directory and executable
APP_PATH=$(find_game_dir "$STEAM_GAME_LIBRARY" "$SteamAppId")
APP_EXEC=$(find_game_exe "$(basename "$APP_PATH")")
APP_EXEC_FULL_PATH="${APP_PATH}/${APP_EXEC}"

# Export required variables
export STEAM_COMPAT_CLIENT_INSTALL_PATH="${STEAM_GAME_LIBRARY}/steamapps"
export STEAM_COMPAT_DATA_PATH="${STEAM_GAME_LIBRARY}/steamapps/compatdata/${SteamAppId}"

# Proton executable
PROTON_EXEC="${PROTON_PATH}/proton"

# Change to the application directory
if ! cd "${APP_PATH}"; then
  echo "Error: Unable to change to directory ${APP_PATH}" >&2
  exit 1
fi

# Run the game
if ! steam-run "${PROTON_EXEC}" run "${APP_EXEC_FULL_PATH}" --skip-launcher; then
  echo "Error: Failed to launch the game" >&2
  exit 1
fi
