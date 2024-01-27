{
  description = "A basic flake with a shell and an inline hello world script";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = {
    nixpkgs,
    flake-utils,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};

      node-modules = pkgs.mkYarnModules {
        version = "0.0.0";
        pname = "elevate";
        name = "elevate-node-deps-0.0.0";
        # version = lib.fileContents ../../../VERSION;
        yarnLock = ./yarn.lock;
        # TODO: package.json needs to be updated every time a new package is installed
        packageJSON = ./package.json;
      };

      service = pkgs.stdenv.mkDerivation {
        name = "service";
        src = ./.;
        buildInputs = [pkgs.yarn pkgs.bun node-modules];
        buildPhase = ''
          mkdir $out
          ln -s ${node-modules}/node_modules $out/node_modules
          mv apps $out/
          mv libs $out/
          pushd $out/libs/frontend
          ${node-modules}/node_modules/.bin/vite build 
          popd
        '';
        installPhase = ''
        '';
      };

      app = pkgs.stdenv.mkDerivation {
        name = "run-wui";
        buildInputs = [service node-modules];
        phases = ["installPhase"];
        installPhase = ''
          mkdir -p $out/bin
          echo "#!${pkgs.stdenv.shell}" > $out/bin/run-wui
          echo "NODE_ENV=production ${pkgs.bun}/bin/bun --bun --prefer-offline --no-install run ${service}/apps/service/src/index.ts" >> $out/bin/run-wui
          chmod +x $out/bin/run-wui
        '';
      };

      devService = pkgs.writeShellScriptBin "start-servers" ''
        #!/usr/bin/env sh
        echo "Starting service and frontend..."

        # Start the service
        (${pkgs.bun}/bin/bun --bun --prefer-offline --no-install --hot run ./apps/service/src/index.ts) &

        # Start the frontend
        (cd ./libs/frontend && ${pkgs.bun}/bin/bunx vite) &

        wait
      '';

    in {
      devShells.default = pkgs.mkShell {
        packages = [pkgs.bashInteractive pkgs.yarn pkgs.bun pkgs.just];
      };

      packages.app = app;
      packages.devService = devService;

      defaultPackage = app;
      
    });
}
