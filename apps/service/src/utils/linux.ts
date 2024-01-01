import { promisify } from "util";
const exec = promisify(require("child_process").exec);

export const setResolution = async (monitor: string, x: number, y: number) => {
  // TODO: validate resolution
  // TODO: validate monitor

  const command = `xrandr -display :0 --output ${monitor} --mode ${x}x${y}`;

  return exec(command);
};

export const runSteamApp = async (appId: number) => {
  const command = `flatpak run com.valvesoftware.Steam "steam://rungameid/${appId}"`;

  return exec(command);
};

export const runRetroArch = async (corePath: string, uri: string) => {
  // const command = `retroarch --fullscreen -L "${corePath}" "${uri}"`;
  const command = `retroarch -L "${corePath}" "${uri}"`;

  return exec(command);
};

export const getLibretroCorePath = async (coreName: string) => {
  // HACK: Only on nixos system with retroarch installed
  const command = `fd -1 "${coreName}$" /nix/store`;
  const { stdout } = await exec(command);

  return stdout.replace(/(\r\n|\n|\r)/gm, "");
};
