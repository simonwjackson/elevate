{
  # Snowfall Lib provides a customized `lib` instance with access to your flake's library
  # as well as the libraries available from your flake's inputs.
  lib,
  # You also have access to your flake's inputs.
  inputs,
  # The namespace used for your flake, defaulting to "internal" if not set.
  namespace,
  # All other arguments come from NixPkgs. You can use `pkgs` to pull shells or helpers
  # programmatically or you may add the named attributes as arguments here.
  pkgs,
  mkShell,
  ...
}:
mkShell {
  # Create your shell
  packages = with pkgs; [
    # Include BATS with support and assert libraries
    (bats.withLibraries (p: [p.bats-support p.bats-assert]))
    # Optional: Include these if you want them available in your shell
    shellcheck # For shell script linting
    jq
    bash
    bc
    gum
    entr
  ];

  # Shell hook to set up the environment
  shellHook = ''
    echo "Welcome to the Bandwidth Calculator development environment!"
    echo "BATS with support and assert libraries is available."
    echo "Use 'bats' to run your tests."
  '';
}
