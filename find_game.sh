#!/usr/bin/env bash

games_db=${XDG_DATA_HOME:-$HOME/.local/share}/elevate/games.yaml

function getLocalGameDbJSONL() {
  if [ ! -f "$games_db" ]; then
    mkdir -p "$(dirname "$games_db")"
    echo "---" > "$games_db"
  fi

  yq eval --no-colors --output-format=json "$games_db" | jq -c '.[]';
}

function getSteamRegistryJSONL() {
  vdf2json ~/.steam/registry.vdf | jq -c '.Registry.HKCU.Software.Valve.Steam.apps | to_entries[] | select(.value.name != null) | {name: .value.name, meta: {platform: {code: "steam", uid: .key | tonumber}, uri: ("steam://run/" + .key)}}'
}

function replace_delimiter_with_spaces () {
  local delimiter="$1"
  local num_spaces="$2"
  local spaces

  spaces=$(printf '\u2007%.0s' $(seq 1 "$num_spaces"))

  sed -u "s/${delimiter}/${spaces}/g"
}

function replace_spaces_with_delimiter() {
  local delimiter="$1"
  local num_spaces="$2"
  local spaces

  spaces=$(printf '\u2007%.0s' $(seq 1 "$num_spaces"))

  sed -u "s/${spaces}/${delimiter}/g"
}


  # | fzf \

  {
    getSteamRegistryJSONL;
    getLocalGameDbJSONL;
  } \
    | jq --raw-output '. | "\(.);\(.meta.platform.code);\(.name)"' \
    | replace_delimiter_with_spaces ';' 3 \
    | fzf \
    --bind 'ctrl-c:abort' \
    --delimiter=$'\u2007' \
    --with-nth=2.. \
    | replace_spaces_with_delimiter ';' 3 \
    | sed -u 's/;.*//' \
    | run_game
