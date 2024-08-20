#!/usr/bin/env nix-shell
#!nix-shell -i bash -p evemu evtest newt websocat
# shellcheck disable=SC1091

# Function to display Whiptail menu
show_menu() {
  whiptail --title "Gamepad Navigation Demo" --menu "Choose an option" 15 60 4 \
    "1" "Mario Kart 8" \
    "4" "Exit" 2>/tmp/whiptail_result
}

# Start the gamepad mapping script in the background
sudo ./keypress.sh &
GAMEPAD_PID=$!

# Trap to ensure we kill the gamepad script when this script exits
trap 'kill $GAMEPAD_PID; exit' EXIT INT TERM

# Main loop
while true; do
  show_menu
  RESULT=$(cat /tmp/whiptail_result)

  case "$RESULT" in
  1)
    # whiptail --title "Menu example" --menu "Choose an option" 25 78 16 \
    #   "<-- Back" "Return to the main menu." \
    #   "Add User" "Add a user to the system." \
    #   "Modify User" "Modify an existing user." \
    #   "List Users" "List all users on the system." \
    #   "Add Group" "Add a user group to the system." \
    #   "Modify Group" "Modify a group and its list of members." \
    #   "List Groups" "List all groups on the system."

    echo '{"command": "run", "args": "/run/current-system/sw/bin/suyu -f -g ''/glacier/snowscape/gaming/games/nintendo-switch/mario-kart-8.nsp''"}' | websocat --no-close --one-message ws://localhost:8080

    whiptail --title "Result" --msgbox "Running.." 8 45
    ;;
  4) break ;;
  *) break ;; # Exit if no selection is made (e.g., Esc pressed)
  esac
done

echo "Exiting..."
