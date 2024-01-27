default:
    @just --choose

dev-service:
    #!/usr/bin/env bash
    set -euxo pipefail

    run() {
      local cmd=$1
      local app_path=$2
      cd "$app_path"
      nix develop .# --command just $cmd
    }

    { run dev ./apps/service & run dev ./libs/frontend; } | bunx bunyan --time local --no-pager --output short &
    wait

dev-mobile:
    #!/usr/bin/env bash
    set -euxo pipefail

    run() {
      local cmd=$1
      local app_path=$2
      cd "$app_path"
      nix develop .# --command just $cmd
    }

    run dev ./apps/mobile &
    run dev ./apps/frontend &
    wait
