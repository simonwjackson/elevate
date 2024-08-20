#!/usr/bin/env -S nix shell nixpkgs#bash nixpkgs#socat nixpkgs#jq -c bash
set -euo pipefail

PORT=9999
RESPONSE_OK="HTTP/1.1 200 OK\r\nContent-Type: application/json\r\n\r\n"
RESPONSE_NOT_FOUND="HTTP/1.1 404 Not Found\r\nContent-Type: application/json\r\n\r\n"
RESPONSE_BAD_REQUEST="HTTP/1.1 400 Bad Request\r\nContent-Type: application/json\r\n\r\n"

handle_request() {
  local method="$1"
  local path="$2"
  local query_string="$3"

  case "$method $path" in
  "GET /api/list")
    local cursor
    local page_size

    cursor=$(echo "$query_string" | grep -oP 'cursor=\K[^&]*' || echo "")
    page_size=$(echo "$query_string" | grep -oP 'page-size=\K[^&]*' || echo "10")

    if ! [[ "$page_size" =~ ^[0-9]+$ ]]; then
      echo -en "$RESPONSE_BAD_REQUEST"
      jq -n '{"error": "Invalid page-size parameter"}'
      return
    fi

    echo -en "$RESPONSE_OK"
    elevate --json list --cursor "$cursor" --page-size "$page_size"
    ;;
  "GET /api/launch/"*)
    local game_id
    local profile_id

    # Extract game-id and profile-id from the path
    game_id=$(echo "$path" | cut -d'/' -f4)
    profile_id=$(echo "$path" | cut -d'/' -f5)

    if [ -z "$game_id" ] || [ -z "$profile_id" ]; then
      echo -en "$RESPONSE_BAD_REQUEST"
      jq -n '{"error": "Missing game-id or profile-id"}'
      return
    fi

    echo -en "$RESPONSE_OK"
    jq -n '{"message": "ok"}'
    elevate launch "$game_id" "$profile_id" 2>&1 |
      tee "$XDG_RUNTIME_DIR/elevate/game.log" |
      tee -a "$XDG_RUNTIME_DIR/elevate-game.log" &
    ;;
  "GET /api/close"*)
    echo -en "$RESPONSE_OK"
    elevate close >/dev/null 2>&1 &
    jq -n '{"message": "ok"}'
    ;;
  *)
    echo -en "$RESPONSE_NOT_FOUND"
    jq -n '{"error": "Not Found"}'
    ;;
  esac
}

main() {
  echo "Starting REST API server on port $PORT..."
  socat TCP-LISTEN:"$PORT",reuseaddr,fork EXEC:"$0 handle",pty,raw,echo=0
}

if [ "${1:-}" = "handle" ]; then
  read -r request_line
  method=$(echo "$request_line" | cut -d' ' -f1)
  request=$(echo "$request_line" | cut -d' ' -f2)
  path=$(echo "$request" | cut -d'?' -f1)
  query_string=$(echo "$request" | cut -s -d'?' -f2)
  handle_request "$method" "$path" "$query_string"
else
  main
fi
