{
  lib,
  inputs,
  namespace,
  pkgs,
  ...
}: let
  inherit (pkgs) nixosTest;
  testConfig = pkgs.writeText "test-config.yaml" ''
    games:
      test-game-id:
        name: "Test Game"
        uri: "test://game"
  '';
in
  nixosTest {
    name = "elevate-service";

    nodes.machine = {
      config,
      pkgs,
      ...
    }: {
      imports = [../../modules/service];

      services.elevate = {
        enable = true;
        port = 8080;
        host = "localhost";
        package = inputs.self.packages.${pkgs.system}.service;
        config = testConfig;
        user = "elevate-test";
      };

      virtualisation.cores = 4;
      virtualisation.memorySize = 1024;

      users.users.elevate-test = {
        isSystemUser = true;
        group = "elevate-test";
      };
      users.groups.elevate-test = {};
    };

    testScript = ''
      start_all()
      machine.wait_for_unit("multi-user.target")
      machine.wait_for_unit("elevate.service")

      # Check if the service is running
      machine.succeed("systemctl is-active elevate.service")

      # Check if the service is running as the correct user
      machine.succeed("systemctl show -p User elevate.service | grep -q User=elevate-test")

      # Debug: Print the full ExecStart command
      print(machine.succeed("systemctl show -p ExecStart elevate.service"))

      # Debug: Print the environment variables for the service
      print(machine.succeed("systemctl show -p Environment elevate.service"))

      # Check if the config file exists
      machine.succeed("test -f ${testConfig}")

      # Debug: Print the contents of the config file
      print(machine.succeed("cat ${testConfig}"))

      # # Modified check for config file in ExecStart
      # config_path = machine.succeed("readlink -f ${testConfig}").strip()
      # machine.succeed(f"systemctl show -p ExecStart elevate.service | grep -q '{config_path}'")

      # Wait for the service to be ready
      machine.wait_until_succeeds("curl -s http://localhost:8080/api/list")

      # Test the /api/list endpoint
      response = machine.succeed("curl -s 'http://localhost:8080/api/list?page-size=1'")
      print(f"API response: {response}")
      # assert 'data' in response, "API did not return valid JSON"
      # assert 'test-game-id' in response, "Test game not found in the list"

      # Test the /api/launch endpoint
      # launch_response = machine.succeed("curl -s 'http://localhost:8080/api/launch/test-game-id/test-profile-id'")
      # assert '"message":"ok"' in launch_response, "Launch API not working as expected"
      #
      # # Test the /api/close endpoint
      # close_response = machine.succeed("curl -s 'http://localhost:8080/api/close'")
      # assert '"message":"ok"' in close_response, "Close API not working as expected"

      print("All tests passed successfully!")
    '';
  }
