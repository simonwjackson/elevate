{pkgs, ...}: {
  buildInputs = with pkgs; [
    bash
    bc
    brillo
  ];
}
