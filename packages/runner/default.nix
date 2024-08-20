{
  pkgs,
  resholve,
  bash,
  coreutils,
  docopts,
  procps,
  jq,
}:
resholve.mkDerivation {
  pname = "runner";
  version = "0.1.0";
  src = ./.;

  installPhase = ''
    install -Dm755 runner.sh $out/bin/runner
  '';

  solutions = {
    runner = {
      scripts = ["bin/runner"];
      interpreter = "${bash}/bin/bash";
      inputs = [
        "${coreutils}/bin"
        "${pkgs.systemd}/bin"
        "${docopts}/bin"
        "${procps}/bin"
        "${jq}/bin"
      ];
      execer = [
        "cannot:${coreutils}/bin/basename"
        "cannot:${coreutils}/bin/env"
        "cannot:${pkgs.systemd}/bin/systemd-run"
        "cannot:${coreutils}/bin/readlink"
        "cannot:${coreutils}/bin/mkdir"
        "cannot:${coreutils}/bin/rm"
        "cannot:${coreutils}/bin/cat"
        "cannot:${coreutils}/bin/echo"
        "cannot:${coreutils}/bin/tee"
        "cannot:${procps}/bin/ps"
        "cannot:${jq}/bin/jq"
      ];
      keep = {
        "$@" = true;
        "$command_to_run" = true;
      };
    };
  };
}
