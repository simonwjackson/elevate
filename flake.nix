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
      in {
        devShell = pkgs.mkShell {
          buildInputs = with pkgs; [
            just
            entr
            fzf
            nodejs_latest
            sqlite
            # nodePackages_latest.pnpm
            yarn-berry

            # apps/service
            nodejs_latest
            fd
          ];
        };
      }
    );
}
