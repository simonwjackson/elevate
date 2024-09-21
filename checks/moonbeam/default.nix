{
  pkgs,
  inputs,
}: let
  moonbeam = pkgs.callPackage ../../packages/moonbeam {inherit inputs;};
  shunit2 = pkgs.shunit2;

  # Read mock executables from files
  mockPing = pkgs.writeShellScriptBin "ping" (builtins.readFile ./mock_ping.sh);
  mockIperf3 = pkgs.writeShellScriptBin "iperf3" (builtins.readFile ./mock_iperf3.sh);
  mockXrandr = pkgs.writeShellScriptBin "xrandr" (builtins.readFile ./mock_xrandr.sh);
  mockMoonlight = pkgs.writeShellScriptBin "moonlight" (builtins.readFile ./mock_moonlight.sh);

  # Create a derivation for the test script
  testScript = pkgs.writeShellApplication {
    name = "test_moonbeam";
    runtimeInputs = [shunit2 moonbeam];
    text = builtins.readFile ./test_moonbeam.sh;
  };
in
  pkgs.runCommand "moonbeam-check" {
    buildInputs = [moonbeam shunit2 mockPing mockIperf3 mockXrandr mockMoonlight testScript];
  } ''
    export PATH="${mockPing}/bin:${mockIperf3}/bin:${mockXrandr}/bin:${mockMoonlight}/bin:$PATH"

    test_moonbeam
    touch $out
  ''
