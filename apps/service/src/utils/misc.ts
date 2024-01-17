import {
  runSteamApp,
  setResolution,
  runRetroArch,
} from "./linux.ts";
import { buildRetroArachCommand } from "../plugins/retroarch/index.ts";
import { getLibretroCorePath } from "../plugins/retroarch/index.ts";
import Release from "@elevate/db/models/Release";
import {startApplication} from "@elevate/utils/processes"

export type LaunchParams = { id: number };
export type ResolutionSetParams = { monitor?: string; x: number; y: number };

// HACK:
const state = {
  monitor: "DP-2-3",
};

export type LaunchOptions = {
  events: {
    onStart: (id: number) => void;
    onStop: (id: number) => void;
  };
};

export const launch = async (release: Release, options?: LaunchOptions) =>
  startApplication (await buildLaunchCmd(release), options);

export const buildLaunchCmd = async (release: Release) => {
  switch (release.platform.code) {
    //   case "steam": {
    //     return runSteamApp(game.meta.steamAppId);
    //   }

    case "nintendo-entertainment-system": {
      return buildRetroArachCommand(
        await getLibretroCorePath("nestopia_libretro.so"),
        release.resources[0].uri,
      );
    }

    case "nintendo-gameboy":
    case "nintendo-gameboy-color":
    case "nintendo-gameboy-advance":
    default: {
      return buildRetroArachCommand(
        await getLibretroCorePath("mgba_libretro.so"),
        release.resources[0].uri,
      );
    }
  }
};