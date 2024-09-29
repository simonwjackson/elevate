{
  lib,
  pkgs,
  inputs,
  ...
}: let
  moonbeam = inputs.self.packages.${pkgs.system}.moonbeam;
in
  pkgs.runCommand "test-moonbeam" {
    buildInputs = [
      pkgs.bats
      pkgs.kcov
      pkgs.bash
      pkgs.coreutils
      moonbeam
    ];
    src = ./.;
  } ''
    mkdir -p $out/coverage
    mkdir -p $out/bin
    cp -r $src/* $out/

    # Make test.sh executable
    if [ -f $out/test.sh ]; then
      chmod +x $out/test.sh
    else
      echo "test.sh not found" >&2
      exit 1
    fi

    # Make mock files executable
    if [ -d $out/mocks ]; then
      find $out/mocks -type f -exec chmod +x {} +
    else
      echo "mocks directory not found" >&2
      exit 1
    fi

    export PATH="${lib.makeBinPath [moonbeam pkgs.bash pkgs.coreutils]}:$out/mocks:$PATH"

    # Run tests
    if bats $out/test.sh; then
      echo "Tests passed successfully!"
    else
      exit 1
    fi
  ''
