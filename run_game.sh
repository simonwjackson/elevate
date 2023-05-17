#!/usr/bin/env bash

withPidFile() {
  echo $! > pidfile
  wait $!
  rm pidfile
}

getLibretroCorePath() {
  core="$1"
  [ -z "$core" ] && echo "Missing core filename" && exit

  corePath=$(fd -1 "$core" /nix/store)
  [ -z "$corePath" ] && echo "$core could not be found" && exit

  echo "$corePath"
}

launchRetroArch() {
  corePath=$(getLibretroCorePath "$1")
  echo "$corePath"

  uri="$2"
  [ -z "$uri" ] && echo "Missing game URI" && exit

  if ! command -v retroarch &> /dev/null; then
    echo "retroarch could not be found"
    exit
  else
    # launch fullscreen
    retroarch --fullscreen -L "$corePath" "$uri" & withPidFile
  fi
}

# Read the game JSON from stdin
gameJson=$(cat)

if [ -n "$gameJson" ]; then
  platformCode=$(echo "$gameJson" | jq --raw-output '.meta.platform.code')
  uri=$(echo "$gameJson" | jq --raw-output '.meta.uri')

  if [ "$platformCode" = "steam" ]; then
    printf "%s" "$gameJson" \
      | jq --raw-output '.meta.platform.uid' \
      | xargs steam -applaunch \
      & withPidFile
  fi

  if [ ! -f "$uri" ]; then
    echo "Game file not found"

  elif [ "$platformCode" = "wiiu" ]; then
    cemu -f -g "$uri" & withPidFile

  elif [ "$platformCode" = "switch" ]; then
    yuzu --fullscreen "$uri" & withPidFile

  elif [ "$platformCode" = "snes" ]; then
    launchRetroArch snes9x_libretro.so "$uri"

  elif [ "$platformCode" = "gba" ]; then
    launchRetroArch mgba_libretro.so "$uri"

  else 
    echo "No game selected"
  fi
else
  echo "Missing game JSON"
fi
