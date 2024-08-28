#!/usr/bin/env bash

_moonbeam_completion() {
  local cur prev opts moonlight_opts
  COMPREPLY=()
  cur="${COMP_WORDS[COMP_CWORD]}"
  prev="${COMP_WORDS[COMP_CWORD - 1]}"
  opts="stream --bitrate --resolution --max-resolution --min-resolution --resolution-steps --reconnect --360 --480 --540 --720 --900 --1080 --1440 --2K --4K --fps --max-fps --min-fps --max-latency --priority --log-level --dry-run --help --version"
  moonlight_opts="--vsync --no-vsync --framerate --bitrate --packetsize --codec --remote-audio --no-remote-audio --width --height --windowed --fullscreen --hdr --no-hdr --nomouse --nosession --quitappafter --verbose --debug --nowarn --keydir --mapping --nounsupported --surround51 --surround71 --localaudio --no-localaudio --force-h264 --force-hevc --forcehevc --unsupported --exit-on-disconnect --absolute-mouse --no-absolute-mouse --quit-after --no-quit-after --multi-controller --no-multi-controller --audio-config --mouse-buttons-swap --no-mouse-buttons-swap --game-optimization --no-game-optimization --frame-pacing --no-frame-pacing --mute-on-focus-loss --no-mute-on-focus-loss --background-gamepad --no-background-gamepad --capture-system-keys --swap-gamepad-buttons --no-swap-gamepad-buttons --performance-overlay --no-performance-overlay --enable-post-stream-prompt --no-enable-post-stream-prompt"

  case "${prev}" in
  --bitrate | --resolution-steps | --fps | --max-fps | --min-fps | --max-latency | --framerate | --packetsize | --width | --height)
    COMPREPLY=()
    return 0
    ;;
  --resolution | --max-resolution | --min-resolution)
    COMPREPLY=($(compgen -W "640x360 854x480 960x540 1280x720 1600x900 1920x1080 2560x1440 3840x2160" -- "${cur}"))
    return 0
    ;;
  --priority)
    COMPREPLY=($(compgen -W "resolution fps" -- "${cur}"))
    return 0
    ;;
  --log-level)
    COMPREPLY=($(compgen -W "QUIET SIMPLE INFO WARN DEBUG TRACE VERBOSE" -- "${cur}"))
    return 0
    ;;
  --codec)
    COMPREPLY=($(compgen -W "auto h264 hevc" -- "${cur}"))
    return 0
    ;;
  --audio-config)
    COMPREPLY=($(compgen -W "stereo 5.1-surround 7.1-surround" -- "${cur}"))
    return 0
    ;;
  --capture-system-keys)
    COMPREPLY=($(compgen -W "auto always never" -- "${cur}"))
    return 0
    ;;
  stream)
    # TODO: logic to complete hostnames and app names
    return 0
    ;;
  esac

  if [[ ${cur} == -* ]]; then
    COMPREPLY=($(compgen -W "${opts} ${moonlight_opts}" -- "${cur}"))
    return 0
  fi
}

if [[ -n ${ZSH_VERSION-} ]]; then
  autoload -U +X bashcompinit && bashcompinit
  autoload -U +X compinit && compinit
fi

complete -F _moonbeam_completion moonbeam
