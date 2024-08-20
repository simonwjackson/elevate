{
  description = "Elevate";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    snowfall-lib = {
      url = "github:snowfallorg/lib";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = inputs:
    inputs.snowfall-lib.mkFlake {
      inherit inputs;

      src = ./.;
      namespace = "elevate";

      meta = {
        name = "elevate";
        title = "Elevate";
      };

      channels-config = {
        allowUnfree = true;
      };
    };
}
