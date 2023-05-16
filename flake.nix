{
  description = "A simple derivation for the hello_main script";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  inputs.subdir_flake.url = "path:./vdf2json"; # Importing the subdirectory flake

  outputs = { self, nixpkgs, subdir_flake }:
    let
      pkgs = nixpkgs.legacyPackages.x86_64-linux.pkgs;
      writeShellApplication = nixpkgs.legacyPackages.x86_64-linux.writeShellApplication;

      launch = writeShellApplication {
        name = "launch";
        runtimeInputs = [
          pkgs.fd
          pkgs.jq
        ];
        text = builtins.readFile ./launch.sh;
      };

    in
    {
      defaultPackage.x86_64-linux = writeShellApplication {
        name = "elevate";
        runtimeInputs = [
          pkgs.fzf
          pkgs.jq
          pkgs.yq-go
          subdir_flake.defaultPackage.x86_64-linux
          launch
        ];
        text = builtins.readFile ./elevate.sh;
      };
    };
}
