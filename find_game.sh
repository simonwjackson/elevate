#!/usr/bin/env bash

games_db=${XDG_DATA_HOME:-$HOME/.local/share}/elevate/games.yaml

getLocalGameDbJSONL() {
  if [ ! -f "$games_db" ]; then
    mkdir -p "$(dirname "$games_db")"
    echo "---" > "$games_db"
  fi

  yq eval --no-colors --output-format=json "$games_db" | jq -c '.[]';
}

getSteamRegistryJSONL() {
  vdf2json ~/.steam/registry.vdf | jq -c '.Registry.HKCU.Software.Valve.Steam.apps | to_entries[] | select(.value.name != null) | {name: .value.name, meta: {platform: {code: "steam", uid: .key | tonumber}, uri: ("steam://run/" + .key)}}'
}

{
  getSteamRegistryJSONL;
  getLocalGameDbJSONL;
} \
  | fzf \
  | run_game
