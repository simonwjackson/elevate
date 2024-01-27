import type { JSONSchemaType } from "ajv";
import ajv from "../ajv";
import Release from "@elevate/db/models/Release";
import { PluginContext } from "../jsonRPC/buildServer";
import type { ElevateContext } from "../..";

export type LauncherAddon = {
  name: string;
  id: string;
  platforms: string[];
  host: string;
  buildLaunchCmd: (release: Release, options: any) => Promise<string>;
};

const schema: JSONSchemaType<LauncherAddon> = {
  type: "object",
  properties: {
    name: { type: "string" },
    id: { type: "string" },
    platforms: { type: "array" },
    host: { type: "string" },
    buildLaunchCmd: {
      isFunction: true,
    },
  } as any,
  required: ["buildLaunchCmd", "name", "platforms", "host", "id"],
};

export type PluginInstaller = (context: ElevateContext) => ElevatePlugin;

export type ElevatePlugin = {
  launchers: LauncherAddon[];
};

const validate = ajv.compile<LauncherAddon>(schema);

const validateLauncher =
  (context: ElevateContext) => (addon: LauncherAddon) => {
    // TODO: need host validation (ex: is linux?)
    if (!validate(addon)) {
      validate.errors?.map((e) => context.log.info(e));
      return;
    }

    return addon;
  };

export const addLauncher = (addon: LauncherAddon, context: PluginContext) => {
  if (validateLauncher(context)(addon)) {
    context.launchers[addon.id] = addon;
    context.log.info(`Added Launcher: ${addon.name}`);
  }
};

export const addPlugin = (
  install: PluginInstaller,
  context: ElevateContext,
) => {
  const plugin = install(context);

  plugin.launchers.map((launcher) => addLauncher(launcher, context));
};
