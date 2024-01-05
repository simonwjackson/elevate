import { promisify } from "util";
import { spawn, ChildProcessWithoutNullStreams } from "child_process";
import { promises as fs, constants } from "fs";
import path from "path";
import { parse as shellParse } from "shell-quote";

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

export const buildRetroArachCommand = (corePath: string, uri: string) => {
  // const command = `retroarch --fullscreen -L "${corePath}" "${uri}"`;
  return `retroarch -L "${corePath}" "${uri}"`;
};

export const getLibretroCorePath = async (coreName: string) => {
  // HACK: Only on nixos system with retroarch installed
  const command = `fd -1 "${coreName}$" /nix/store`;
  const { stdout } = await exec(command);

  return stdout.replace(/(\r\n|\n|\r)/gm, "");
};

// HACK: assuming /tmp exists
const PIDFILE = path.join("/tmp", "elevate.pid");

function parseCommand(commandString: string): [string, string[]] {
  const parsed = shellParse(commandString);
  const command = parsed.shift();
  const args = parsed.map((arg) => (typeof arg === "string" ? arg : ""));

  return [command?.toString() ?? "", args];
}

export async function startApplication(
  commandString: string,
  onStart: (pid: number) => void,
  onStop: (pid: number) => void,
): Promise<number | null> {
  try {
    await fs.access(PIDFILE, constants.F_OK);
    console.log(`PID file ${PIDFILE} exists. Process might be running.`);
    return null;
  } catch (err) {
    // PID file does not exist, continue
  }

  const [command, args] = parseCommand(commandString);

  const child = spawn(command, args, {
    detached: true,
    stdio: "ignore",
  });

  child.unref();

  if (child.pid) {
    try {
      await fs.writeFile(PIDFILE, child.pid.toString());
      console.log(`PID written to ${PIDFILE}`);
      onStart(child.pid);
    } catch (err) {
      console.error(`Failed to write PID file: ${(err as Error).message}`);
    }
  }

  child.on("close", () => {
    fs.unlink(PIDFILE).catch(console.error);
    onStop(child.pid ?? -1);
  });

  process.on("SIGINT", () => {
    fs.unlink(PIDFILE).catch(console.error);
    child.kill();
    process.exit();
  });

  process.on("SIGTERM", () => {
    fs.unlink(PIDFILE).catch(console.error);
    child.kill();
    process.exit();
  });

  return child.pid ?? null;
}
