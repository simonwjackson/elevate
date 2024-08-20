#!/usr/bin/env bash

get_display_resolution_kde() {
  display=$(kscreen-doctor -o | awk '
    /Output:/ {
        if (enabled && priority > max_priority) {
            max_priority = priority
            result = block
        }
        block = $0 "\n"
        enabled = 0
        priority = 0
    }
    /enabled/ { enabled = 1 }
    /priority/ { priority = $NF }
    { block = block $0 "\n" }
    END {
        if (enabled && priority > max_priority) {
            result = block
        }
        print result
    }
')

  resolution=$(echo -e "$display" | grep "Modes" | grep -o '[0-9]\+x[0-9]\+@[0-9]\+\*' | sed 's/@[0-9]\+\*//')
  rotation=$(echo -e "$display" | grep "Rotation:" | awk '{print $3}' | tr -cd '0-9' | tr -d '0' | cut -c1-)
  warn "$rotation"

  if [ $((rotation % 2)) -eq 0 ]; then
    echo "$resolution" | awk -F'x' '{print $2 "x" $1}'
  else
    echo "$resolution"
  fi
}

get_display_resolution_xorg() {
  xrandr 2>/dev/null | awk '
    /connected/ {
        output = $1
        if ($2 == "primary") {
            primary = output
        }
        connected[output] = 1
    }
    /^[^ ]/ {
        current = $1
    }
    /\*/ {
        if (connected[current]) {
            match($0, /([0-9]+x[0-9]+)/, arr)
            if (arr[1] != "") {
                resolution[current] = arr[1]
            }
        }
    }
    END {
        if (primary != "" && resolution[primary] != "") {
            print resolution[primary]
        } else {
            for (out in connected) {
                if (resolution[out] != "") {
                    print resolution[out]
                    exit
                }
            }
        }
    }
  '
}

get_display_resolution() {
  local result
  local methods=(
    "get_display_resolution_kde"
    "get_display_resolution_xorg"
    # Add more methods here in the future
  )
  for method in "${methods[@]}"; do
    if type "$method" &>/dev/null; then
      result=$($method)
      if [[ -n "$result" && "$result" =~ ^[0-9]+x[0-9]+$ ]]; then
        echo "$result"
        return 0
      fi
    fi
  done
  warn "Error: Could not determine display resolution"
  return 1
}

get_display_refresh_rate() {
  local result

  # List of functions to try, in order of preference
  local methods=(
    "get_display_refresh_rate_kde"
    "get_display_refresh_rate_xorg"
    # Add more methods here in the future
  )

  for method in "${methods[@]}"; do
    if type "$method" &>/dev/null; then
      result=$($method)
      if [[ -n "$result" && "$result" =~ ^[0-9]+$ ]]; then
        echo "$result"
        return 0
      fi
    fi
  done

  echo "Error: Could not determine refresh rate" >&2
  return 1
}

get_display_refresh_rate_kde() {
  kscreen-doctor -o 2>/dev/null | awk '
        /Output:/ {output=$2; connected=0; priority=-1}
        /connected/ {connected=1}
        /enabled/ {enabled=1}
        /priority/ {priority=$2}
        /Modes:/ && enabled==1 && connected==1 {
            if (priority > max_priority) {
                max_priority = priority
                match($0, /[0-9]+x[0-9]+@([0-9]+)\*/, arr)
                if (arr[1] != "") {
                    result = arr[1]
                }
            }
        }
        END {print result}
    '
}

get_display_refresh_rate_xorg() {
  xrandr 2>/dev/null | awk '
        /connected/ {
            output = $1
            if ($2 == "primary") {
                primary = output
            }
            connected[output] = 1
        }
        /^[^ ]/ {
            current = $1
        }
        /\*/ {
            if (connected[current]) {
                match($0, /([0-9.]+)\*/, arr)
                if (arr[1] != "") {
                    rate[current] = arr[1]
                }
            }
        }
        END {
            if (primary != "" && rate[primary] != "") {
                printf "%.0f\n", rate[primary]
            } else {
                for (out in connected) {
                    if (rate[out] != "") {
                        printf "%.0f\n", rate[out]
                        exit
                    }
                }
            }
        }
    '
}
