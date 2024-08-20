{
  bash,
  coreutils,
  docopts,
  gawk,
  gnused,
  lib,
  resholve,
  ryzenadj,
  stdenv,
  pkgs,
}:
resholve.mkDerivation {
  pname = "tdp";
  version = "0.1.0";
  src = ./.;

  buildInputs = [bash docopts gnused ryzenadj];

  installPhase = ''
    install -Dm755 tdp.sh $out/bin/tdp
  '';

  solutions = {
    tdp = {
      scripts = ["bin/tdp"];
      interpreter = "${bash}/bin/bash";
      inputs = [
        "${pkgs.systemd}/bin"
        "${docopts}/bin"
        "${gnused}/bin"
        "${ryzenadj}/bin"
        "${coreutils}/bin"
        "${gnused}/bin"
        "${gawk}/bin"
      ];
      execer = [
        # resholve cannot verify args from these apps
        "cannot:${pkgs.ryzenadj}/bin/ryzenadj"
        "cannot:${coreutils}/bin/cat"
        "cannot:${pkgs.systemd}/bin/systemd-run"
        "cannot:${coreutils}/bin/basename"
        "cannot:${docopts}/bin/docopts"
        "cannot:${gnused}/bin/sed"
        "cannot:${gawk}/bin/awk"
      ];
      fake = {
        # HACK
        external = ["sudo"];
      };
      keep = {
        "$@" = true;
      };
    };
  };

  meta = with lib; {
    description = "A script to manage TDP for Ryzen processors";
    license = licenses.mit;
    platforms = platforms.linux;
  };
}
