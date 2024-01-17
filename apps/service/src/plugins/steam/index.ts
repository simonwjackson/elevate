import Release from "@elevate/db/models/Release";
import { PluginInstaller } from "../../utils/plugins/addLauncher";

export const buildSteamCmd = async (appId: string) =>
  `flatpak run com.valvesoftware.Steam "steam://rungameid/${appId}"`;

export const install: PluginInstaller = (context) => {
  return {
    launchers: [
      {
        name: "steam",
        id: "steam",
        host: "linux",
        platforms: ["steam"],
        buildLaunchCmd: async (release: Release) =>
          buildSteamCmd(release.id + ""),
      },
    ],
  };
};

export default install;

/*

Steam starts 
  PID exists, but not for the game
start scanning for appId in steam output
  when found, run callback

2 types of launchers; direct launch & indirect launch

Ways to find PIDs

* return value of direct launch
* parsing `pgrep`
* tailing a log (maybe)
* X11 title parsing

*/