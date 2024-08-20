{
  lib,
  bash,
  coreutils,
  gnugrep,
  jq,
  resholve,
  socat,
  inputs,
  pkgs,
}:
resholve.mkDerivation {
  pname = "service";
  version = "0.1.0";
  src = ./.;

  installPhase = ''
    install -Dm755 service.sh $out/bin/service
  '';

  solutions = {
    service = {
      scripts = ["bin/service"];
      interpreter = "${bash}/bin/bash";
      inputs = [
        "${inputs.self.packages.${pkgs.system}.elevate}/bin"
        "${coreutils}/bin"
        "${socat}/bin"
        "${jq}/bin"
        "${gnugrep}/bin"
      ];
      execer = [
        "cannot:${inputs.self.packages.${pkgs.system}.elevate}/bin/elevate"
        "cannot:${coreutils}/bin/cut"
        "cannot:${coreutils}/bin/echo"
        "cannot:${coreutils}/bin/tee"
        "cannot:${gnugrep}/bin/grep"
        "cannot:${socat}/bin/socat"
        "cannot:${jq}/bin/jq"
      ];
    };
  };

  meta = with lib; {
    description = "Elevate service";
    license = licenses.mit;
    platforms = platforms.all;
  };
}
