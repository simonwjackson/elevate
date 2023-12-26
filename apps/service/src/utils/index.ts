import { readdirSync, statSync } from "fs";
import { gameDb } from "../fakeDb.ts";
import { runSteamApp, setResolution } from "./linux.ts";
import { NodeMethods } from "../../../../types.js";
import Release from "@elevate/db/models/Release.ts";

export type LaunchParams = { id: number };
export type ResolutionSetParams = { monitor?: string; x: number; y: number };

export type LinuxHostMethods = {
  "resolution/set"(params: ResolutionSetParams): string;
  scanReleases(): "ok";
  launch(params: LaunchParams): string;
  getAllReleases(): Release[];
} & NodeMethods;

// HACK:
const state = {
  monitor: "DP-2-3",
};

export const parseLaunch = (payload: LaunchParams) => {
  const game = gameDb[payload.id];

  switch (game.platform) {
    case "steam": {
      return runSteamApp(game.meta.steamAppId);
    }
    default:
    case "nintendo-entertainment-system": {
      return "";
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
    const { paths, ext } = platformMap[platform];
    result[platform] = paths.flatMap((path) => scanFiles(path, ext));
  }

  return result;
};
