{
  lib,
  stdenv,
  resholve,
  coreutils,
  pkgs,
}: let
  common = import ./common.nix {inherit pkgs;};
in
  resholve.mkDerivation {
    inherit (common) buildInputs;

    pname = "battery";
    version = "0.1.0";
    src = ./.;

    installPhase = ''
      install -Dm755 battery.sh $out/bin/battery
    '';

    solutions = {
      battery = {
        scripts = ["bin/battery"];
        interpreter = "${pkgs.bash}/bin/bash";
        inputs = [
          "${pkgs.bc}/bin"
          "${pkgs.brillo}/bin"
          "${pkgs.coreutils}/bin"
        ];
        execer = [
          # resholve cannot verify args from these apps
          "cannot:${pkgs.brillo}/bin/brillo"
          "cannot:${pkgs.bc}/bin/bc"
          "cannot:${pkgs.coreutils}/bin/cat"
        ];
        keep = {
          "$DEBUG" = true;
        };
      };
    };

    meta = with lib; {
      description = "A script to estimate remaining battery life";
      license = licenses.mit;
      platforms = platforms.linux;
    };
  }
