{
  description = "A very basic flake";

  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = {
    self,
    nixpkgs,
    flake-utils,
    ...
  } @ inputs:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = nixpkgs.legacyPackages.${system};
        importBuildInputs = app: import ./apps/${app}/buildInputs.nix {inherit pkgs;};
        apps = builtins.attrNames (builtins.readDir ./apps);
        appFlakes = builtins.listToAttrs (map (app: {
            name = app;
            value = import ./apps/${app};
          })
          apps);
      in {
        devShell = pkgs.mkShell {
          buildInputs = [
            pkgs.just
            pkgs.fzf
            pkgs.parallel
          ];
        };
        apps = appFlakes;
      }
    );
}
