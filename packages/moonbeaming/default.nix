{
  lib,
  stdenv,
  bun,
  mkShell,
  writeShellScriptBin,
}: let
  packageJson = lib.importJSON ./package.json;

  # Function to find the project root
  findProjectRoot = ''
    find_project_root() {
      local dir="$PWD"
      while [[ "$dir" != "/" ]]; do
        if [[ -f "$dir/flake.nix" ]]; then
          echo "$dir/packages/moonbeam.ing"
          return 0
        fi
        dir="$(dirname "$dir")"
      done
      echo "Error: Could not find project root (directory containing flake.nix)" >&2
      return 1
    }
  '';

  # Create a wrapper script for bun commands
  bunWrapper = writeShellScriptBin "bun" ''
    #!/usr/bin/env bash
    ${findProjectRoot}
    MOONBEAMING_ROOT=$(find_project_root) || exit 1
    # exec ${bun}/bin/bun "$@" --cwd "$MOONBEAMING_ROOT"
    (cd "$MOONBEAMING_ROOT" && exec ${bun}/bin/bun "$@")
  '';

  # Create a wrapper script for bunx commands
  bunxWrapper = writeShellScriptBin "bunx" ''
    #!/usr/bin/env bash
    ${findProjectRoot}
    MOONBEAMING_ROOT=$(find_project_root) || exit 1
    # exec ${bun}/bin/bunx "$@" --cwd "$MOONBEAMING_ROOT"
    (cd "$MOONBEAMING_ROOT" && exec ${bun}/bin/bunx "$@")
  '';
in
  mkShell {
    buildInputs = [
      bunWrapper
      bunxWrapper
    ];

    shellHook = ''
      ${findProjectRoot}
      export MOONBEAMING_ROOT=$(find_project_root) || exit 1
      export PATH="$MOONBEAMING_ROOT/node_modules/.bin:$PATH"

      echo "Project root: $MOONBEAMING_ROOT"

      if [ ! -d "$MOONBEAMING_ROOT/node_modules" ] || [ ! -f "$MOONBEAMING_ROOT/bun.lockb" ]; then
        echo "Installing dependencies..."
        ${bunWrapper}/bin/bun install
      else
        echo "Verifying dependencies..."
        ${bunWrapper}/bin/bun install --frozen-lockfile
      fi

      echo "Astro development environment ready!"
      echo "Bun version: $(${bunWrapper}/bin/bun --version)"
      echo "To start development server, run: bun run dev"
      echo "You can now run 'bun' and 'bunx' commands from any directory."
    '';

    # Expose package.json data to Nix
    inherit (packageJson) name version description;

    # Meta information
    meta = with lib; {
      description = "Astro project for moonbeam.ing";
      homepage = "https://github.com/yourusername/moonbeam.ing"; # Update this
      license = licenses.mit; # Update this to match your project's license
      maintainers = with maintainers; [yourgithubusername]; # Update this
    };
  }
