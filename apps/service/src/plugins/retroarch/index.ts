import Release from "@elevate/db/models/Release";
import {
  PluginInstaller,
} from "../../utils/plugins/addLauncher";
import { exec } from "../../utils/linux";

export const getLibretroCorePath = async (coreName: string) => {
  // HACK: Only on nixos system with retroarch installed
  const command = `fd -1 "${coreName}$" /nix/store`;
  const { stdout } = await exec(command);

  return stdout.replace(/(\r\n|\n|\r)/gm, "");
};

export const buildRetroArachCommand = (corePath: string, uri: string) => {
  const cmd = `retroarch -L "${corePath}" "${uri}"`;
  console.log(corePath, uri, cmd);
  // const command = `retroarch --fullscreen -L "${corePath}" "${uri}"`;
  return `retroarch -L "${corePath}" "${uri}"`;
};

export const install: PluginInstaller = (context) => {
  return {
    launchers: [
      {
        name: "mGBA (retroarch)",
        id: "mgba",
        host: "linux",
        platforms: [
          "nintendo-gameboy",
          "nintendo-gameboy-advance",
          "nintendo-gameboy-color",
        ],
        buildLaunchCmd: async (release: Release) =>
          buildRetroArachCommand(
            await getLibretroCorePath("mgba_libretro.so"),
            release.resources[0].uri,
          ),
      },
      {
        name: "Nestopia (retroarch)",
        id: "nestopia",
        host: "linux",
        platforms: ["nintendo-entertainment-system"],
        buildLaunchCmd: async (release: Release) =>
          buildRetroArachCommand(
            await getLibretroCorePath("nestopia_libretro.so"),
            release.resources[0].uri,
          ),
      },
    ],
  };
};

export default install;
