import { promisify } from "util";
const exec = promisify(require("child_process").exec);

export const setResolution = async (monitor: string, x: number, y: number) => {
  // TODO: validate resolution
  // TODO: validate monitor

  const command = `xrandr -display :0 --output ${monitor} --mode ${x}x${y}`;

  return exec(command);
};

export function runSteamApp(appId: number) {
  const command = `flatpak run com.valvesoftware.Steam "steam://rungameid/${appId}"`;

  return exec(command);
}
