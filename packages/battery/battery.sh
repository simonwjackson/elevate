#!/usr/bin/env bash

set -e

DEBUG=false

# Function to print debug information
debug_print() {
  if [ "$DEBUG" = true ]; then
    echo "Debug: $1" >&2
  fi
}

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
  --debug)
    DEBUG=true
    shift
    ;;
  *)
    WATTAGE=$1
    shift
    ;;
  esac
done

# Check if wattage is provided
if [ -z "$WATTAGE" ]; then
  echo "Error: Wattage must be provided." >&2
  exit 1
fi

# Validate input
if ! [[ $WATTAGE =~ ^[0-9]+(\.[0-9]+)?$ ]]; then
  echo "Error: Wattage must be a positive number." >&2
  exit 1
fi

debug_print "Input wattage (excluding screen) = $WATTAGE W"

# Get current brightness percentage
BRIGHTNESS_PCT=$(brillo -G)
debug_print "Current brightness = $BRIGHTNESS_PCT%"

# Calculate screen power draw
MIN_SCREEN_WATTAGE=0
MAX_SCREEN_WATTAGE=1.5
SCREEN_WATTAGE=$(echo "scale=6; $MIN_SCREEN_WATTAGE + ($MAX_SCREEN_WATTAGE - $MIN_SCREEN_WATTAGE) * $BRIGHTNESS_PCT / 100" | bc)

debug_print "Estimated screen power draw = $SCREEN_WATTAGE W"

# Get battery information
BATTERY_PATH="/sys/class/power_supply/BAT0"
if [ ! -d "$BATTERY_PATH" ]; then
  echo "Error: Battery information not found." >&2
  exit 1
fi

ENERGY_FULL=$(cat "$BATTERY_PATH/energy_full")
ENERGY_NOW=$(cat "$BATTERY_PATH/energy_now")

debug_print "ENERGY_FULL = $ENERGY_FULL, ENERGY_NOW = $ENERGY_NOW"

# Calculate remaining capacity in watt-hours
REMAINING_CAPACITY=$(echo "scale=6; $ENERGY_NOW / 1000000" | bc)

debug_print "REMAINING_CAPACITY = $REMAINING_CAPACITY Wh"

# Calculate multiplier
multiplier=$(echo "scale=6; 0.015625 * $WATTAGE + 0.9375" | bc)

# Calculate draw
TOTAL_WATTAGE=$(echo "scale=6; ($WATTAGE + 7) * $multiplier + $SCREEN_WATTAGE" | bc)

debug_print "TOTAL_WATTAGE (including screen) = $TOTAL_WATTAGE W"

# Assume 85% efficiency
EFFECTIVE_WATTAGE=$(echo "scale=6; $TOTAL_WATTAGE" | bc)

debug_print "EFFECTIVE_WATTAGE (after efficiency loss) = $EFFECTIVE_WATTAGE W"

# Calculate remaining time in minutes
REMAINING_MINUTES=$(echo "scale=2; ($REMAINING_CAPACITY / $EFFECTIVE_WATTAGE) * 60" | bc)

debug_print "REMAINING_MINUTES = $REMAINING_MINUTES"

echo "$REMAINING_MINUTES"
