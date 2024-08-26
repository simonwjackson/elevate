{
  lib,
  inputs,
  namespace,
  pkgs,
  mkShell,
  ...
}: let
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
    packages = [
      (pkgs.bats.withLibraries (p: [p.bats-support p.bats-assert]))
      pkgs.shellcheck
      pkgs.bash
      pkgs.entr
      wrappedJust # This now correctly references the let-bound wrappedJust
    ];

    shellHook = ''
      echo "Welcome to the Bandwidth Calculator development environment!"
      echo "BATS with support and assert libraries is available."
      echo "Use 'bats' to run your tests."
      echo "The 'just' command has been wrapped to always use the project root as the working directory"
      echo "and the justfile in the project root."
    '';
  }
