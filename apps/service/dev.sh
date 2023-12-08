#!/usr/bin/env bash
find src | entr -r bun run ./src/index.ts
