{
  description = "A simple derivation for the hello_subdir script";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs = { self, nixpkgs }:
    let
      pkgs = nixpkgs.legacyPackages.x86_64-linux.pkgs;
      python = pkgs.python3.withPackages (ps: with ps; [ vdf ]);
    in
    {
      defaultPackage.x86_64-linux = nixpkgs.legacyPackages.x86_64-linux.writeShellApplication {
        name = "vdf2json";
        runtimeInputs = [ python ];
        text = ''
          python -c "import sys, json; import vdf; print(json.dumps(vdf.parse(open('""$*""'))))" 
        '';
      };
    };
}

