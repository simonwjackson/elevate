#!/usr/bin/env bash
# shellcheck disable=SC1091

# Usage: arguments_example.sh [-h] 
#        arguments_example.sh play [id] 
# 
# Options:
#   -h --help     Show this screen.

# auto parse the header above, See: docopt_get_help_string
source docopts.sh --auto "$@"

# # print the parsed arguments
# for a in "${!ARGS[@]}" ; do
#   echo "$a = ${ARGS[$a]}"
#   # sanitize the argument name
#   var_name=$(echo "$a" | tr -d '<>-')
#   # create variables named after the arguments
#   declare "$var_name=${ARGS[$a]}"
# done

play=${ARGS[play]:-false}
id=${ARGS[id]:-false}

if [ "$play" = "true" ]; then
  if [ "$id" = "false" ]; then
    find_game
  else
    run_game "$id"
  fi
fi
