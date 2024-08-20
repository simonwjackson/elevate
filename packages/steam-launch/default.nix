{
  bash,
  coreutils,
  gawk,
  gnugrep,
  gnused,
  jq,
  lib,
  resholve,
  steam-run,
  stdenv,
  binutils,
}:
resholve.mkDerivation {
  pname = "steam-launch";
  version = "0.1.0";
  src = ./.;

  buildInputs = [
    bash
    gnused
    jq
    steam-run
    binutils
  ];

  installPhase = ''
    install -Dm755 steam-launch.sh $out/bin/steam-launch
  '';

  solutions = {
    steam-launch = {
      scripts = ["bin/steam-launch"];
      interpreter = "${bash}/bin/bash";
      inputs = [
        "${gnused}/bin"
        "${jq}/bin"
        "${steam-run}/bin"
        "${coreutils}/bin"
        "${gawk}/bin"
        "${gnugrep}/bin"
        "${binutils}/bin"
      ];
      execer = [
        "cannot:${coreutils}/bin/basename"
        "cannot:${coreutils}/bin/cat"
        "cannot:${coreutils}/bin/sleep"
        "cannot:${gnugrep}/bin/grep"
        "cannot:${gnused}/bin/sed"
        "cannot:${gawk}/bin/awk"
        "cannot:${binutils}/bin/strings"
        "cannot:${steam-run}/bin/steam-run"
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
