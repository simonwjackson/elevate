#!/usr/bin/env bash

set -e

doc="TDP Management Script for Ryzen

Usage:
  $(basename "$0") [<tdp>]
  $(basename "$0") -h | --help

Options:
  -h, --help  Show this screen.

Arguments:
  <tdp>  TDP value to set (in watts). If not provided, the current TDP will be displayed.
"

# Parse arguments using docopts
eval "$(docopts -h "$doc" : "$@")"

get_current_tdp() {
  sudo ryzenadj --info |
    sed -n 's/^| STAPM LIMIT *| *\([0-9.]*\) .*$/\1/p' |
    awk '{printf "%d\n", $1 * 1000}'
}

set_tdp() {
  local tdp="$1"

  sudo ryzenadj \
    --stapm-limit="$tdp" \
    --fast-limit="$tdp" \
    --slow-limit="$tdp" \
    --tctl-temp=90 \
    --power-saving
}

main() {
  if [ $# -eq 0 ]; then
    current_tdp=$(get_current_tdp)
    echo "$current_tdp"
  else
    tdp="$1"
    if ! [[ "$tdp" =~ ^[0-9]+$ ]]; then
      echo "Error: Invalid TDP value. Please provide an integer." >&2
      exit 1
    fi
    set_tdp "$tdp"
    echo "TDP set to $tdp watts"
  fi
}

main "$@"
