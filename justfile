default:
  @just --choose

mobile-dev:
  #!/usr/bin/env bash
  set -euxo pipefail

  just -f ./apps/mobile/justfile dev &
  just -f ./apps/frontend/justfile dev &
  wait
