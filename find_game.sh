#!/usr/bin/env bash

steamRegistry=$(vdf2json ~/.steam/registry.vdf \
  | jq -c '.Registry.HKCU.Software.Valve.Steam.apps | to_entries[] | select(.value.name != null) | {name: .value.name, meta: {platform: {code: "steam", uid: .key | tonumber}, uri: ("steam://run/" + .key)}}'
)

echo "$steamRegistry"

gamesYaml=$(cat <<EOF
- name: Yoshi's Island
  meta:
    last_played: 2023-01-02
    platform: 
      code: snes
    uri: /home/simonwjackson/downloads/smw2.zip
EOF
)

gameJson=$({ echo "$steamRegistry"; echo "$gamesYaml" | yq --no-colors --output-format=json | jq -c '.[]'; } | fzf)

echo "$gameJson" | run_game
