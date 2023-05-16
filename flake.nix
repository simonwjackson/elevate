{
  description = "A simple derivation for the hello_main script";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  inputs.subdir_flake.url = "path:./vdf2json"; # Importing the subdirectory flake

  outputs = { self, nixpkgs, subdir_flake }:
    let
      pkgs = nixpkgs.legacyPackages.x86_64-linux.pkgs;
      writeShellApplication = nixpkgs.legacyPackages.x86_64-linux.writeShellApplication;
    in
    {
      defaultPackage.x86_64-linux = self.cli;

      cli = writeShellApplication {
        name = "cli";
        runtimeInputs = [
          pkgs.fzf
          pkgs.jq
          pkgs.yq-go
          pkgs.docopts
          subdir_flake.defaultPackage.x86_64-linux
          self.find_game
          self.run_game
        ];
        text = builtins.readFile ./cli.sh;
      };

      find_game = writeShellApplication {
        name = "find_game";
        runtimeInputs = [
          pkgs.fzf
          pkgs.jq
          pkgs.yq-go
          subdir_flake.defaultPackage.x86_64-linux
        ];
        text = builtins.readFile ./find_game.sh;
      };

      run_game = writeShellApplication {
        name = "run_game";
        runtimeInputs = [
          pkgs.docopts
          pkgs.fd
          pkgs.jq
        ];
        text = builtins.readFile ./run_game.sh;
      };
    };
}
