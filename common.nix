{pkgs, ...}: {
  buildInputs = with pkgs; [
    entr
  ];
}
