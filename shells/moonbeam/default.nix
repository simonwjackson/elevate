{
  lib,
  inputs,
  namespace,
  pkgs,
  mkShell,
  ...
}: let
  moonbeam = inputs.self.packages.${pkgs.system}.moonbeam;
  # pkgCommon = import ../../packages/battery/common.nix {inherit pkgs;};
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
      repoCommon.buildInputs
      # pkgCommon.buildInputs
      ++ [
        wrappedJust
        moonbeam
        pkgs.bats
        pkgs.kcov
        pkgs.bash
        pkgs.coreutils
      ];

    shellHook = ''
      echo hi
    '';
  }
