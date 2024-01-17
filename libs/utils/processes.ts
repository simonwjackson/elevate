import {
  StartApplicationOptions,
  PIDFILE,
} from "@elevate/service/src/utils/linux";
import { spawn } from "child_process";
import { promises as fs, constants } from "fs";
import { parse as shellParse } from "shell-quote";

export function parseCommand(commandString: string): [string, string[]] {
  const parsed = shellParse(commandString);
  const command = parsed.shift();
  const args = parsed.map((arg) => (typeof arg === "string" ? arg : ""));

  return [command?.toString() ?? "", args];
}

export const startApplication = async (
  commandString: string,
  options?: StartApplicationOptions,
) => {
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
      options?.events?.onStart?.(child.pid);
    } catch (err) {
      console.error(`Failed to write PID file: ${(err as Error).message}`);
    }
  }

  child.on("close", () => {
    fs.unlink(PIDFILE).catch(console.error);
    options?.events?.onStop?.(child.pid ?? -1);
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
};

/*
  States:

  * Loading
  * Open
  * Closing
  * Closed
*/
