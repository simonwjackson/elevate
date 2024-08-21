#!/usr/bin/env bash

apply_display_limits() {
  local streaming_params

  if ! streaming_params=$(
    limit_max_display_values \
      "${CONFIG[max_resolution_set]}" \
      "${CONFIG[resolution_set]}" \
      "${CONFIG[shorthand_res_set]}" \
      "${CONFIG[max_resolution]}" \
      "${CONFIG[max_fps_set]}" \
      "${CONFIG[max_fps]}"
  ); then
    return 1
  fi
  read -r CONFIG["max_resolution"] CONFIG["max_fps"] <<<"$streaming_params"
}
