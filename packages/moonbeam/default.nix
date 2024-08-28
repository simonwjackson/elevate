{
  lib,
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
    iputils
    jq
    moonlight-qt
    ncurses5
    procps
    xorg.xrandr
  ];

  inputBins = map (pkg: "${pkg}/bin") commonInputs;

  generateVersion = let
    getDate = pkgs.writeShellScript "get-date" ''
      date +%Y.%m.%d
    '';

    sourceHash = builtins.substring 0 8 (builtins.hashString "sha256" (builtins.readFile ./bin/moonbeam));
  in
    pkgs.lib.removeSuffix "\n" (builtins.readFile (pkgs.runCommand "version" {} ''
      date=$(${getDate})
      echo "$date-${sourceHash}" > $out
    ''));
in
  resholve.mkDerivation rec {
    pname = "moonbeam";
    version = generateVersion;
    src = ./.;

    buildInputs =
      [pkgs.bats]
      ++ commonInputs;

    patchPhase = ''
      # HACK
      sed -i 's| -- iperf| -- ${pkgs.iperf3}/bin/iperf3|g' ./bin/moonbeam
      sed -i 's|log_command="gum|log_command="${lib.getExe pkgs.gum}|g' ./bin/moonbeam

      # Replace version placeholder
      sed -i 's|__VERSION__|${version}|g' ./bin/moonbeam
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
          "cannot:${coreutils}/bin/basename"
          "cannot:${coreutils}/bin/cat"
          "cannot:${coreutils}/bin/cut"
          "cannot:${coreutils}/bin/date"
          "cannot:${coreutils}/bin/dirname"
          "cannot:${coreutils}/bin/env"
          "cannot:${coreutils}/bin/fold"
          "cannot:${coreutils}/bin/head"
          "cannot:${coreutils}/bin/mkdir"
          "cannot:${coreutils}/bin/mkfifo"
          "cannot:${coreutils}/bin/mktemp"
          "cannot:${coreutils}/bin/rm"
          "cannot:${coreutils}/bin/seq"
          "cannot:${coreutils}/bin/sleep"
          "cannot:${coreutils}/bin/sort"
          "cannot:${coreutils}/bin/tac"
          "cannot:${coreutils}/bin/tail"
          "cannot:${coreutils}/bin/tee"
          "cannot:${coreutils}/bin/tr"
          "cannot:${coreutils}/bin/uniq"
          "cannot:${coreutils}/bin/wc"
          "cannot:${findutils}/bin/xargs"
          "cannot:${gawk}/bin/awk"
          "cannot:${gnugrep}/bin/grep"
          "cannot:${gnused}/bin/sed"
          "cannot:${gum}/bin/gum"
          "cannot:${iperf3}/bin/iperf3"
          "cannot:${iputils}/bin/ping"
          "cannot:${jq}/bin/jq"
          "cannot:${moonlight-qt}/bin/moonlight"
          "cannot:${ncurses5}/bin/tput"
          "cannot:${procps}/bin/pgrep"
          "cannot:${procps}/bin/ps"
          "cannot:${xorg.xrandr}/bin/xrandr"
        ];
        keep = {
          "$@" = true;
          "$log_command" = true;
          "$method" = true;
          "$stream_started" = true;
          "$command" = true;
          "$new_latency" = true;
        };
        fake = {
          external = [
            "bats_load_library" # Add this line
            # HACK: https://github.com/abathur/resholve/issues/80
            "ping"
            "kscreen-doctor"
            "hyprctl"
          ];
        };
      };
    };
  }
