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
    src = ../../packages/moonbeam;
  } ''
    mkdir -p $out/bin
    cp -r $src/* $out/

    export PATH="${lib.makeBinPath [moonbeam pkgs.bash pkgs.coreutils]}:$out/mocks:$PATH"

    bats $out/test.sh
    bats $out/calculate.sh
  ''
