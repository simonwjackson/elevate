#!/usr/bin/env nix-shell
#!nix-shell -i bash -p evemu evtest
# shellcheck disable=SC1091

# Check if running as root
if [ "$EUID" -ne 0 ]; then
  echo "Please run as root"
  exit
fi

# Gamepad device
GAMEPAD="/dev/input/event9"

# Keyboard device (you may need to adjust this)
KEYBOARD="/dev/input/event0"

# Key codes
KEY_UP=103
KEY_DOWN=108
KEY_LEFT=105
KEY_RIGHT=106
KEY_ENTER=28
KEY_ESC=1

# Function to simulate key press/release
simulate_key() {
  local key="$1"
  local value="$2"

  evemu-event "$KEYBOARD" --type EV_KEY --code "$key" --value "$value"
  evemu-event "$KEYBOARD" --type EV_SYN --code 0 --value 0
}

# Function to handle D-pad input
handle_dpad() {
  local code="$1"
  local value="$2"

  case "$code" in
  16) # D-pad left/right
    if [ "$value" -eq 1 ]; then
      simulate_key "$KEY_RIGHT" 1
    elif [ "$value" -eq -1 ]; then
      simulate_key "$KEY_LEFT" 1
    else
      simulate_key "$KEY_LEFT" 0
      simulate_key "$KEY_RIGHT" 0
    fi
    ;;
  17) # D-pad up/down
    if [ "$value" -eq -1 ]; then
      simulate_key "$KEY_UP" 1
    elif [ "$value" -eq 1 ]; then
      simulate_key "$KEY_DOWN" 1
    else
      simulate_key "$KEY_UP" 0
      simulate_key "$KEY_DOWN" 0
    fi
    ;;
  esac
}

# Function to handle button presses
handle_button() {
  local code="$1"
  local value="$2"

  case "$code" in
  304) # A button (adjust if necessary)
    simulate_key "$KEY_ENTER" "$value"
    ;;
  305) # B button (adjust if necessary)
    simulate_key "$KEY_ESC" "$value"
    ;;
  esac
}

# Trap to handle script termination
trap 'simulate_key "$KEY_ENTER" 0; exit' EXIT INT TERM

# Read gamepad input and map to keyboard
evtest "$GAMEPAD" | while read -r line; do
  if [[ "$line" == *"type 3 (EV_ABS)"* ]]; then
    code=$(echo "$line" | awk '{print $8}' | tr -d ',')
    value=$(echo "$line" | awk '{print $11}')
    handle_dpad "$code" "$value"
  elif [[ "$line" == *"type 1 (EV_KEY)"* ]]; then
    code=$(echo "$line" | awk '{print $8}' | tr -d ',')
    value=$(echo "$line" | awk '{print $11}')
    handle_button "$code" "$value"
  fi
done
