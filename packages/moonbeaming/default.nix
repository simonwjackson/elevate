{
  lib,
  stdenv,
  nodejs-18_x,
  nodePackages,
  pnpm,
  mkShell,
}: let
  packageJson = lib.importJSON ./package.json;
in
  mkShell {
    buildInputs = [
      nodejs-18_x
      pnpm
    ];

    shellHook = ''
      export PATH="$PWD/node_modules/.bin:$PATH"

      if [ ! -d "node_modules" ] || [ ! -f "pnpm-lock.yaml" ]; then
        echo "Installing dependencies..."
        pnpm install
      else
        echo "Verifying dependencies..."
        pnpm install --frozen-lockfile
      fi

      echo "Astro development environment ready!"
      echo "Node version: $(node --version)"
      echo "pnpm version: $(pnpm --version)"
      echo "To start development server, run: pnpm dev"
    '';

    # Expose package.json data to Nix
    inherit (packageJson) name version description;

    # Meta information
    meta = with lib; {
      description = "Astro project for moonbeaming";
      homepage = "https://github.com/yourusername/moonbeaming"; # Update this
      license = licenses.mit; # Update this to match your project's license
      maintainers = with maintainers; [yourgithubusername]; # Update this
    };
  }
