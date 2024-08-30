mock_xrandr() {
  cat <<EOF
Screen 0: minimum 320 x 200, current 1920 x 1080, maximum 16384 x 16384
HDMI-1 connected primary 1920x1080+0+0 (normal left inverted right x axis y axis) 530mm x 300mm
   1920x1080     60.00*+  59.94    50.00    60.05    60.00    50.04  
   1680x1050     59.95  
   1600x900      60.00  
   1280x1024     75.02    60.02  
   1280x720      60.00    59.94    50.00  
   1024x768      75.03    70.07    60.00  
   800x600       75.00    72.19    60.32    56.25  
   720x480       60.00    59.94  
   640x480       75.00    72.81    60.00    59.94  
EOF
}

# Override the real xrandr command with our mock function
xrandr() {
  mock_xrandr
}

# Export the function so it's available to subshells
export -f xrandr
export -f mock_xrandr
