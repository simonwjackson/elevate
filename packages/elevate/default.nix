{
  bash,
  bc,
  gnugrep,
  coreutils,
  gawk,
  gnused,
  lib,
  resholve,
  ryzenadj,
  procps,
  jq,
  yq-go,
  gum,
  pkgs,
  inputs,
}:
resholve.mkDerivation {
  pname = "elevate";
  version = "0.1.0";
  src = ./.;

  buildInputs = [gnused];

  patchPhase = ''
    sed -i 's|=runner|=${inputs.self.packages.${pkgs.system}.runner}/bin/runner|g' elevate.sh
    sed -i 's|=tdp|=${inputs.self.packages.${pkgs.system}.tdp}/bin/tdp|g' elevate.sh
  '';

  installPhase = ''
    install -Dm755 elevate.sh $out/bin/elevate
  '';

  solutions = {
    elevate = {
      scripts = ["bin/elevate"];
      interpreter = "${bash}/bin/bash";
      inputs = [
        "${bc}/bin"
        "${coreutils}/bin"
        "${gnugrep}/bin"
        "${gnused}/bin"
        "${inputs.self.packages.${pkgs.system}.runner}/bin"
        "${inputs.self.packages.${pkgs.system}.tdp}/bin"
        "${jq}/bin"
        "${pkgs.gum}/bin"
        "${pkgs.which}/bin"
        "${procps}/bin"
        "${yq-go}/bin"
      ];
      # fixes = {
      #   runner = "${inputs.self.packages.${pkgs.system}.runner}/bin/runner";
      # };
      execer = [
        "cannot:${bc}/bin/bc"
        "cannot:${coreutils}/bin/touch"
        "cannot:${coreutils}/bin/basename"
        "cannot:${coreutils}/bin/cat"
        "cannot:${coreutils}/bin/cut"
        "cannot:${coreutils}/bin/dirname"
        "cannot:${coreutils}/bin/echo"
        "cannot:${coreutils}/bin/mkdir"
        "cannot:${coreutils}/bin/readlink"
        "cannot:${coreutils}/bin/rm"
        "cannot:${coreutils}/bin/sed"
        "cannot:${coreutils}/bin/sleep"
        "cannot:${coreutils}/bin/tee"
        "cannot:${coreutils}/bin/wc"
        "cannot:${gnugrep}/bin/grep"
        "cannot:${gnused}/bin/sed"
        "cannot:${inputs.self.packages.${pkgs.system}.runner}/bin/runner"
        "cannot:${inputs.self.packages.${pkgs.system}.tdp}/bin/tdp"
        "cannot:${jq}/bin/jq"
        "cannot:${pkgs.gum}/bin/gum"
        "cannot:${pkgs.which}/bin/which"
        "cannot:${procps}/bin/ps"
        "cannot:${yq-go}/bin/yq"
      ];
      keep = {
        "$@" = true;
        "$final_command" = true;
      };
    };
  };
}
