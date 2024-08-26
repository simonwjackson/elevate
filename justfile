import? "packages/battery/justfile"
import? "packages/tdp/justfile"
import? "packages/steam-launch/justfile"
import? "packages/service/justfile"
import? "packages/runner/justfile"
import? "packages/elevate/justfile"
import? "packages/moonbeaming/justfile"
import? "packages/moonbeam/justfile"

# List all available tasks
default:
    @just --list

# all: test
#
# # variadic arguments
# test *names:
#     ./run_tests.sh {{ names }}
#
# # Private -- omitted from just --list
# _private-task:
#     echo "Private task"
#
# doc:
#     python .github/main.py generate
#
# lint:
#     python .github/main.py lint
#     stylua --check .
#
# # command argument as environment variable
# greet $name:
#     echo "Hello $name"
# monorepo/justfile
