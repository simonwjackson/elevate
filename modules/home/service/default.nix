{
  inputs,
  config,
  lib,
  pkgs,
  ...
}: let
  inherit (lib) mkEnableOption mkOption types mkIf;
  cfg = config.services.elevate;
in {
  options.services.elevate = {
    enable = mkEnableOption "Elevate service";

    package = mkOption {
      type = types.package;
      default = inputs.self.packages.${pkgs.system}.service;
      description = "The Elevate service package to use";
    };

    port = mkOption {
      type = types.port;
      default = 8080;
      description = "Port on which the Elevate service listens";
    };

    configFile = mkOption {
      type = types.nullOr types.path;
      default = null;
      description = "Path to the Elevate configuration file (optional)";
    };

    extraPackages = mkOption {
      type = types.listOf types.package;
      default = [];
      description = "Additional packages to install for the Elevate service";
    };
  };

  config = mkIf cfg.enable {
    # HACK: these packages should not pollute HOME
    home.packages =
      cfg.extraPackages
      ++ [
        inputs.self.packages.${pkgs.system}.elevate
      ];

    systemd.user.services.elevate = {
      Unit = {
        Description = "Elevate Service";
        After = ["network.target"];
      };

      Service = {
        ExecStart = "${cfg.package}/bin/service";
        Restart = "always";
        Environment = lib.optional (cfg.configFile != null) "CONFIG=${cfg.configFile}";
      };

      Install = {
        WantedBy = ["default.target"];
      };
    };

    systemd.user.services.iperf3-server = {
      Unit = {
        Description = "iperf3 Server";
        After = ["network.target"];
      };

      Service = {
        ExecStart = "${pkgs.iperf3}/bin/iperf3 -s -p 31347";
        Restart = "always";
      };

      Install = {
        WantedBy = ["default.target"];
      };
    };
  };
}
