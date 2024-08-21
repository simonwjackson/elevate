{
  inputs,
  bash,
  pkgs,
  resholve,
}: let
  commonInputs = with pkgs; [
    bats
    bc
    coreutils
    findutils
    gamemode
    gamescope
    gawk
    gnugrep
    gnused
    gum
    iperf3
    iperf3
    iputils
    jq
    moonlight-qt
    ncurses5
    procps
    xorg.xrandr
  ];

  inputBins = map (pkg: "${pkg}/bin") commonInputs;
in
  resholve.mkDerivation rec {
    pname = "moonbeam";
    version = "0.1.0";
    src = ./.;

    buildInputs =
      [pkgs.bats]
      ++ commonInputs;

    patchPhase = with pkgs; ''
      # HACK
      sed -i 's| -- iperf| -- ${lib.getExe iperf3}|g' ./bin/moonbeam
      sed -i 's|log_command="gum|log_command="${lib.getExe gum}|g' ./bin/moonbeam
    '';

    buildPhase = ''
      mkdir -p $out
      cp -R . $out
    '';

    installPhase = ''
      chmod +x $out/bin/*
    '';

    postPatch = ''
      for file in $(find src tests -type f); do
        patchShebangs "$file"
      done
    '';

    checkInputs = [
      (pkgs.bats.withLibraries (p: [p.bats-support p.bats-assert]))
    ];

    checkPhase = ''
      runHook preCheck

      # export PATH="$out/bin:$PATH"
      cd $out/bin
      ${pkgs.bats.withLibraries (p: [p.bats-support p.bats-assert])}/bin/bats --verbose-run ../tests

      runHook postCheck
    '';

    # doCheck = true;

    solutions = {
      moonbeam = {
        scripts = [
          "bin/*"
        ];
        interpreter = "${bash}/bin/bash";
        inputs =
          inputBins
          ++ [
            # IMPORTANT: needed to source other scripts
            "${placeholder "out"}/bin"
          ];
        execer = with pkgs; [
          "cannot:${bats}/bin/bats"
          "cannot:${bc}/bin/bc"
          "cannot:${gnused}/bin/sed"
          "cannot:${procps}/bin/pgrep"
          "cannot:${procps}/bin/ps"
          "cannot:${coreutils}/bin/basename"
          "cannot:${coreutils}/bin/cat"
          "cannot:${coreutils}/bin/sort"
          "cannot:${coreutils}/bin/tr"
          "cannot:${coreutils}/bin/uniq"
          "cannot:${coreutils}/bin/dirname"
          "cannot:${coreutils}/bin/cut"
          "cannot:${coreutils}/bin/date"
          "cannot:${coreutils}/bin/env"
          "cannot:${coreutils}/bin/head"
          "cannot:${coreutils}/bin/mktemp"
          "cannot:${coreutils}/bin/rm"
          "cannot:${coreutils}/bin/sleep"
          "cannot:${coreutils}/bin/mkdir"
          "cannot:${coreutils}/bin/tail"
          "cannot:${ncurses5}/bin/tput"
          "cannot:${coreutils}/bin/tee"
          "cannot:${coreutils}/bin/wc"
          "cannot:${findutils}/bin/xargs"
          "cannot:${gawk}/bin/awk"
          "cannot:${gnugrep}/bin/grep"
          "cannot:${gum}/bin/gum"
          "cannot:${iperf3}/bin/iperf3"
          "cannot:${iputils}/bin/ping"
          "cannot:${jq}/bin/jq"
          "cannot:${moonlight-qt}/bin/moonlight"
          "cannot:${xorg.xrandr}/bin/xrandr"
        ];
        keep = {
          "$@" = true;
          "$log_command" = true;
          "$method" = true;
          "$stream_started" = true;
        };
        fake = {
          external = [
            "bats_load_library" # Add this line
            # HACK: https://github.com/abathur/resholve/issues/80
            "ping"
            "kscreen-doctor"
          ];
        };
      };
    };
  }
