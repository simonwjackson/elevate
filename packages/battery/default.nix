{
  lib,
  stdenv,
  resholve,
  bash,
  bc,
  brillo,
  coreutils,
}:
resholve.mkDerivation {
  pname = "battery";
  version = "0.1.0";
  src = ./.;

  buildInputs = [bash bc brillo];

  installPhase = ''
    install -Dm755 battery.sh $out/bin/battery
  '';

  solutions = {
    battery = {
      scripts = ["bin/battery"];
      interpreter = "${bash}/bin/bash";
      inputs = [
        "${bc}/bin"
        "${brillo}/bin"
        "${coreutils}/bin"
      ];
      execer = [
        # resholve cannot verify args from these apps
        "cannot:${brillo}/bin/brillo"
        "cannot:${bc}/bin/bc"
        "cannot:${coreutils}/bin/cat"
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
