#!/usr/bin/env bash

usage_doc="Moonlight optimization for Linux nomads

Usage:
  $(basename "$0") [options] stream <host> <app>

Moonbeam Options:
  --bitrate <bitrate>                          Available bitrate in Kbps (default: calculated from max resolution and FPS)
  --resolution <WxH>                           Set both min and max resolution (e.g., 1920x1080)
  --max-resolution <WxH>                       Maximum resolution (e.g., 1920x1080)
  --min-resolution <WxH>                       Minimum resolution (e.g., 640x360)
  --360                                        Force a 640x360 resolution
  --480                                        Force a 854x480 resolution
  --540                                        Force a 960x540 resolution
  --720                                        Force a 1280x720 resolution
  --900                                        Force a 1600x900 resolution
  --1080                                       Force a 1920x1080 resolution
  --1440                                       Force a 2560x1440 resolution
  --2K                                         Force a 2048x1080 resolution
  --4K                                         Force a 3840x2160 resolution
  --fps <fps>                                  Set both min and max FPS (e.g., 60)
  --max-fps <fps>                              Maximum FPS (e.g., 120)
  --min-fps <fps>                              Minimum FPS (e.g., 30)
  --max-latency <ms>                           Maximum allowed latency in milliseconds
  -p, --priority <resolution|fps>              Prioritize resolution or FPS in optimization (default: fps)
  --log-level <level>                          Set log level (QUIET, INFO, WARN, DEBUG, TRACE, VERBOSE)
  --dry-run                                    Show the Moonlight command without executing it
  --reconnect                                  Automatically reconnect if the stream is disconnected
  -h, --help                                   Show this help message

Moonlight Options:
  --vsync                                      Use V-Sync.
  --no-vsync                                   Do not use V-Sync.
  --packet-size <packet-size>                  Specify video packet size to
                                               use.
  --display-mode <display-mode>                Select display mode:
                                               borderless/fullscreen/windowed.
  --audio-config <audio-config>                Select audio config:
                                               5.1-surround/7.1-surround/stereo.
  --multi-controller                           Use multiple controller support.
  --no-multi-controller                        Do not use multiple controller
                                               support.
  --quit-after                                 Use quit app after session.
  --no-quit-after                              Do not use quit app after
                                               session.
  --absolute-mouse                             Use remote desktop optimized
                                               mouse control.
  --no-absolute-mouse                          Do not use remote desktop
                                               optimized mouse control.
  --mouse-buttons-swap                         Use left and right mouse buttons
                                               swap.
  --no-mouse-buttons-swap                      Do not use left and right mouse
                                               buttons swap.
  --touchscreen-trackpad                       Use touchscreen in trackpad
                                               mode.
  --no-touchscreen-trackpad                    Do not use touchscreen in
                                               trackpad mode.
  --game-optimization                          Use game optimizations.
  --no-game-optimization                       Do not use game optimizations.
  --audio-on-host                              Use audio on host PC.
  --no-audio-on-host                           Do not use audio on host PC.
  --frame-pacing                               Use frame pacing.
  --no-frame-pacing                            Do not use frame pacing.
  --mute-on-focus-loss                         Use mute audio when Moonlight
                                               window loses focus.
  --no-mute-on-focus-loss                      Do not use mute audio when
                                               Moonlight window loses focus.
  --background-gamepad                         Use background gamepad input.
  --no-background-gamepad                      Do not use background gamepad
                                               input.
  --reverse-scroll-direction                   Use inverted scroll direction.
  --no-reverse-scroll-direction                Do not use inverted scroll
                                               direction.
  --swap-gamepad-buttons                       Use swap A/B and X/Y gamepad
                                               buttons (Nintendo-style).
  --no-swap-gamepad-buttons                    Do not use swap A/B and X/Y
                                               gamepad buttons (Nintendo-style).
  --keep-awake                                 Use prevent display sleep while
                                               streaming.
  --no-keep-awake                              Do not use prevent display sleep
                                               while streaming.
  --performance-overlay                        Use show performance overlay.
  --no-performance-overlay                     Do not use show performance
                                               overlay.
  --hdr                                        Use HDR streaming.
  --no-hdr                                     Do not use HDR streaming.
  --capture-system-keys <capture-system-keys>  Select capture system key
                                               combos: always/fullscreen/never.
  --video-codec <video-codec>                  Select video codec:
                                               AV1/H.264/HEVC/auto.
  --video-decoder <video-decoder>              Select video decoder:

Arguments:
  stream                     Start stream
  <host>                     The host to stream to
  <app>                      The application to stream

Note: 
  - Use either --resolution, --max-resolution, --min-resolution, or one of the preset resolutions (--360, --480, --720, --1080, --1440, --4K)
  - If --max-fps is not provided, it will be determined based on the current display's refresh rate
  - If --bitrate is not provided, it will be calculated based on max resolution and FPS
  - Latency will be automatically detected
"

validate_user_input() {
  # Validate max_latency
  if [[ -n "${CONFIG[max_latency]}" ]]; then
    if ! [[ "${CONFIG[max_latency]}" =~ ^[0-9]+$ ]]; then
      error "Max latency must be a positive integer (with optional 'ms' suffix)"
      return 1
    fi
  fi

  # Validate bitrate
  if [[ -n "${CONFIG[available_bitrate]}" && ! "${CONFIG[available_bitrate]}" =~ ^[0-9]+$ ]]; then
    error "Bitrate must be a positive integer"
    return 1
  fi

  # Validate resolutions
  local res_to_check=("${CONFIG[max_resolution]}" "${CONFIG[min_resolution]}")
  if [[ "${CONFIG[resolution_set]}" == "true" ]]; then
    res_to_check+=("${CONFIG[resolution]}")
  fi
  for res in "${res_to_check[@]}"; do
    if ! is_valid_resolution "$res"; then
      error "Invalid resolution format: $res"
      return 1
    fi
  done

  # Validate FPS
  local fps_to_check=("${CONFIG[max_fps]}" "${CONFIG[min_fps]}")
  for fps in "${fps_to_check[@]}"; do
    if [[ -n "$fps" && ! "$fps" =~ ^[0-9]+$ ]]; then
      error "FPS must be a positive integer"
      return 1
    fi
  done

  # Validate priority
  if [[ "${CONFIG[prioritize]}" != "resolution" && "${CONFIG[prioritize]}" != "fps" ]]; then
    error "Priority must be either 'resolution' or 'fps'"
    return 1
  fi

  # Validate host and app
  if [[ -z "${CONFIG[host]}" || -z "${CONFIG[app]}" ]]; then
    error "Missing required arguments: stream <host> <app>"
    return 1
  fi

  # Additional validation from limit_max_display_values
  if [[ "${CONFIG[max_resolution_set]}" == "true" || "${CONFIG[resolution_set]}" == "true" || "${CONFIG[shorthand_res_set]}" == "true" ]]; then
    if ! [[ "${CONFIG[max_resolution]}" =~ ^[0-9]+x[0-9]+$ ]]; then
      error "Invalid resolution format. Expected WxH (e.g., 1920x1080)."
      return 1
    fi
  fi

  if [[ "${CONFIG[max_fps_set]}" == "true" ]]; then
    if ! [[ "${CONFIG[max_fps]}" =~ ^[0-9]+$ ]]; then
      error "Invalid FPS. Expected a positive integer."
      return 1
    fi
  fi

  return 0
}

parse_args() {
  handle_non_stream_command() {
    local moonlight_cmd="moonlight $*"
    eval "$moonlight_cmd"
  }

  if [[ ! " $* " =~ " stream " ]]; then
    local moonlight_cmd="moonlight $*"
    handle_non_stream_command "$@" |
      sed \
        -e 's/Moonlight/Moonbeam/g' \
        -e "s/moonlight/$(basename "$0")/g"
    exit $?
  fi

  while [[ $# -gt 0 ]]; do
    case $1 in
    --help | -h)
      echo "$usage_doc"
      exit 0
      ;;
    --max-latency)
      local latency_value="$2"
      latency_value="${latency_value%ms}"
      CONFIG[max_latency]="$latency_value"
      shift 2
      ;;
    --bitrate)
      CONFIG[available_bitrate]="$2"
      shift 2
      ;;
    --max-resolution)
      if [[ -z "$2" || "$2" == -* ]]; then
        CONFIG[max_resolution]=$(get_display_resolution)
      else
        CONFIG[max_resolution]=$(convert_shorthand_resolution "$2")
        shift
      fi
      CONFIG[max_resolution_set]=true
      shift
      ;;
    --resolution)
      CONFIG[resolution]=$(convert_shorthand_resolution "$2")
      CONFIG[max_resolution]="${CONFIG[resolution]}"
      CONFIG[min_resolution]="${CONFIG[resolution]}"
      CONFIG[resolution_set]=true
      shift 2
      ;;
    --min-resolution)
      CONFIG[min_resolution]=$(convert_shorthand_resolution "$2")
      CONFIG[min_resolution_set]=true
      shift 2
      ;;
    --360* | --480* | --540* | --720* | --900* | --1080* | --1440* | --2K | --4K)
      res=$(convert_shorthand_resolution "${1#--}")
      CONFIG[max_resolution]="$res"
      CONFIG[min_resolution]="$res"
      CONFIG[shorthand_res_set]=true
      shift
      ;;
    --max-fps)
      if [[ -z "$2" || "$2" == -* ]]; then
        CONFIG[max_fps]=$(get_display_refresh_rate)
      else
        CONFIG[max_fps]="$2"
        shift
      fi
      CONFIG[max_fps_set]=true
      shift
      ;;
    --fps)
      CONFIG[max_fps]="$2"
      CONFIG[min_fps]="$2"
      CONFIG[max_fps_set]=true
      CONFIG[min_fps_set]=true
      shift 2
      ;;
    --min-fps)
      CONFIG[min_fps]="$2"
      CONFIG[min_fps_set]=true
      shift 2
      ;;
    -p | --priority)
      CONFIG[prioritize]="$2"
      shift 2
      ;;
    --log-level)
      validate_and_set_log_level "$2"
      shift 2
      ;;
    --dry-run)
      CONFIG[dry_run]=true
      shift
      ;;
    --reconnect)
      CONFIG[reconnect]=true
      shift
      ;;
    stream)
      CONFIG[host]="$2"
      CONFIG[app]="$3"
      shift 3
      ;;
    *)
      # If it's not a recognized option, assume it's a Moonlight option and pass it through
      CONFIG[extra_moonlight_options]+=" $1"
      shift
      ;;
    esac
  done

  # Call validate_inputs at the end of parse_args
  if ! validate_user_input; then
    exit 1
  fi
}
