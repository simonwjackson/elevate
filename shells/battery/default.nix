{
  lib,
  inputs,
  namespace,
  pkgs,
  mkShell,
  ...
}: let
  pkgCommon = import ../../packages/battery/common.nix {inherit pkgs;};
  repoCommon = import ../../common.nix {inherit pkgs;};

  # Create a custom wrapped version of just
  wrappedJust = pkgs.symlinkJoin {
    name = "wrapped-just";
    paths = [pkgs.just];
    buildInputs = [pkgs.makeWrapper];
    postBuild = ''
      wrapProgram $out/bin/just \
        --add-flags "--working-directory \$(git rev-parse --show-toplevel)" \
        --add-flags "--justfile \$(git rev-parse --show-toplevel)/justfile"
    '';
  };
in
  mkShell {
    packages =
      pkgCommon.buildInputs
      ++ repoCommon.buildInputs
      ++ [
        wrappedJust
      ];

    shellHook = ''
      echo "Welcome to the Bandwidth Calculator development environment!"
      echo "The 'just' command has been wrapped to always use the project root as the working directory"
      echo "and the justfile in the project root."
      echo "Additional build inputs from common.nix have been added to the environment."
    '';
  }
