{
  pkgs,
  lib,
  resholve,
  binutils,
}:
resholve.mkDerivation {
  pname = "steam-launch";
  version = "0.1.0";
  src = ./.;

  buildInputs = [
    pkgs.bash
    pkgs.binutils
    pkgs.gnused
    pkgs.jq
    pkgs.steam-run
  ];

  installPhase = ''
    install -Dm755 steam-launch.sh $out/bin/steam-launch
  '';

  solutions = {
    steam-launch = {
      scripts = ["bin/steam-launch"];
      interpreter = "${pkgs.bash}/bin/bash";
      inputs = [
        "${pkgs.binutils}/bin"
        "${pkgs.coreutils}/bin"
        "${pkgs.findutils}/bin"
        "${pkgs.gawk}/bin"
        "${pkgs.gnugrep}/bin"
        "${pkgs.gnused}/bin"
        "${pkgs.gum}/bin"
        "${pkgs.jq}/bin"
        "${pkgs.steam-run}/bin"
      ];
      execer = [
        "cannot:${pkgs.binutils}/bin/strings"
        "cannot:${pkgs.coreutils}/bin/basename"
        "cannot:${pkgs.coreutils}/bin/cat"
        "cannot:${pkgs.coreutils}/bin/cut"
        "cannot:${pkgs.coreutils}/bin/dirname"
        "cannot:${pkgs.coreutils}/bin/head"
        "cannot:${pkgs.coreutils}/bin/mkdir"
        "cannot:${pkgs.coreutils}/bin/sleep"
        "cannot:${pkgs.coreutils}/bin/sort"
        "cannot:${pkgs.coreutils}/bin/wc"
        "cannot:${pkgs.findutils}/bin/find"
        "cannot:${pkgs.gawk}/bin/awk"
        "cannot:${pkgs.gnugrep}/bin/grep"
        "cannot:${pkgs.gnused}/bin/sed"
        "cannot:${pkgs.gum}/bin/gum"
        "cannot:${pkgs.steam-run}/bin/steam-run"
      ];
      fake = {
        external = ["steam" "pgrep" "setsid"];
      };
      keep = {
        "$@" = true;
      };
    };
  };

  meta = with lib; {
    description = "A script to launch Steam games with Proton";
    license = licenses.mit;
    platforms = platforms.linux;
  };
}
