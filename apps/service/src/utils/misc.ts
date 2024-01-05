import { readdirSync, statSync } from "fs";
import {
  runSteamApp,
  setResolution,
  runRetroArch,
  getLibretroCorePath,
  startApplication,
  buildRetroArachCommand,
} from "./linux.ts";
import { NodeMethods } from "../../../../types.js";
import Release from "@elevate/db/models/Release.ts";

export type LaunchParams = { id: number };
export type ResolutionSetParams = { monitor?: string; x: number; y: number };

export type LinuxHostMethods = {
  "resolution/set"(params: ResolutionSetParams): string;
  scanReleases(): "ok";
  launch(release: Release): Promise<number | null>;
  getAllReleases(filterObj: any): Release[];
} & NodeMethods;

// HACK:
const state = {
  monitor: "DP-2-3",
};

export const launch =
  (events: { onStart: (id: number) => void; onStop: (id: number) => void }) =>
  async (release: Release) => {
    return startApplication(
      await buildLaunchCmd(release),
      (pid) => {
        console.log(`Application started with PID: ${pid}`);
        events.onStart(pid);
      },
      (pid) => {
        console.log(`Application stopped`);
        events.onStop(pid);
      },
    ).catch((err) => {
      console.error(err);
      return null;
    });
  };

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

export const scanFiles = (dirPath: string, ext: string[]): string[] => {
  let filesFound: string[] = [];

  try {
    const files = readdirSync(dirPath);

    for (const file of files) {
      const fullPath = `${dirPath}/${file}`;
      const fileStat = statSync(fullPath);

      if (fileStat.isDirectory()) {
        // If the file is a directory, recursively scan it
        filesFound = [...filesFound, ...scanFiles(fullPath, ext)];
      } else {
        // If the file is not a directory, check if it matches the extensions
        if (ext.some((extension) => file.endsWith(`.${extension}`))) {
          filesFound.push(fullPath);
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error);
  }

  return filesFound;
};

export const strictGameScanner = () => {
  // HACK: Hardcoded
  const root = "/glacier/snowscape/gaming/games";
  const platformMap = {
    "nintendo-entertainment-system": {
      paths: [`${root}/nintendo-entertainment-system`],
      ext: ["nes"],
    },
    "nintendo-gameboy": {
      paths: [`${root}/nintendo-gameboy`],
      ext: ["gb"],
    },
    "nintendo-gameboy-advance": {
      paths: [`${root}/nintendo-gameboy-advance`],
      ext: ["gba"],
    },
    "nintendo-gameboy-color": {
      paths: [`${root}/nintendo-gameboy-color`],
      ext: ["gbc"],
    },
    // "nintendo-gamecube": {
    //   paths: [`${root}/nintendo-gamecube`],
    //   ext: ["iso"],
    // },
    // "nintendo-wii": {
    //   paths: [`${root}/nintendo-wii`],
    //   ext: ["iso"],
    // },
    // "nintendo-wii-u": {
    //   paths: [`${root}/nintendo-wii-u`],
    //   ext: ["iso"],
    // },
  };

  const result = {};

  for (const platform in platformMap) {
    // @ts-ignore
    const { paths, ext } = platformMap[platform];
    // @ts-ignore
    result[platform] = paths.flatMap((path) => scanFiles(path, ext));
  }

  return result;
};
