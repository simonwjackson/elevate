import { promisify } from "util";
import path from "path";

export const exec = promisify(require("child_process").exec);

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

// HACK: assuming /tmp exists
export const PIDFILE = path.join("/tmp", "elevate.pid");

export type StartApplicationOptions = {
  events?: {
    onStart?: (pid: number) => void;
    onStop?: (pid: number) => void;
  };
};