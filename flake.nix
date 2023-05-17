{
  description = "A simple derivation for the hello_main script";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs = { self, nixpkgs, ... }:
    let
      pkgs = nixpkgs.legacyPackages.x86_64-linux.pkgs;
      writeShellApplication = nixpkgs.legacyPackages.x86_64-linux.writeShellApplication;
      python = pkgs.python3.withPackages (ps: with ps; [ vdf ]);
    in
    {
      defaultPackage.x86_64-linux = self.cli;

      cli = writeShellApplication {
        name = "cli";
        runtimeInputs = [
          pkgs.docopts
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
          self.vdf2json
          self.run_game
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

      vdf2json = writeShellApplication {
        name = "vdf2json";
        runtimeInputs = [ python ];
        text = ''
          python -c "import sys, json; import vdf; print(json.dumps(vdf.parse(open('""$*""'))))" 
        '';
      };
    };
}
