import { MutateJsonRpcServer } from "../../utils/jsonRPC/buildServer";
import { ResourceFound, strictResourceScanner } from "@elevate/utils/files";
import { generateRandomString } from "@elevate/utils/misc";
import { getClient } from "../../utils/jsonRPC/misc";
import { ResolutionSetParams } from "../../utils/misc";
// import Release from "@elevate/db/models/Release";
import { NodeMethods } from "@elevate/utils/types";
import * as fs from "fs";
import * as path from "path";
import { pipe } from "fp-ts/lib/function";
import { filter, map, reduce } from "fp-ts/lib/Array";
import { promise as fastq, queueAsPromised } from "fastq";
import { startApplication } from "@elevate/utils/processes";

const getTopLevelDirectories = (dir: string): string[] =>
  fs
    .readdirSync(dir)
    .filter((file) => fs.statSync(path.join(dir, file)).isDirectory());

const platforms = {
  "atari-2600": "atari-2600",
  "atari-5200": "atari-5200",
  "atari-7800": "atari-7800",
  "atari-jaguar": "atari-jaguar",
  "atari-lynx": "atari-lynx",
  "nintendo-entertainment-system": "nintendo-entertainment-system",
  "super-nintendo-entertainment-system": "super-nintendo-entertainment-system",
  "nintendo-64": "nintendo-64",
  "nintendo-gamecube": "nintendo-gamecube",
  "nintendo-wii": "nintendo-wii",
  "nintendo-wii-u": "nintendo-wii-u",
  "nintendo-switch": "nintendo-switch",
  "nintendo-gameboy": "nintendo-gameboy",
  "nintendo-gameboy-color": "nintendo-gameboy-color",
  "nintendo-gameboy-advance": "nintendo-gameboy-advance",
  "nintendo-ds": "nintendo-ds",
  "nintendo-3ds": "nintendo-3ds",
  "sega-master-system": "sega-master-system",
  "sega-genesis": "sega-genesis",
  "sega-cd": "sega-cd",
  "sega-32x": "sega-32x",
  "sega-saturn": "sega-saturn",
  "sega-dreamcast": "sega-dreamcast",
  "sega-game-gear": "sega-game-gear",
  "sony-playstation": "sony-playstation",
  "sony-playstation-2": "sony-playstation-2",
  "sony-playstation-3": "sony-playstation-3",
  "sony-playstation-4": "sony-playstation-4",
  "sony-playstation-5": "sony-playstation-5",
  "sony-psp": "sony-psp",
  "sony-ps-vita": "sony-ps-vita",
  "microsoft-xbox": "microsoft-xbox",
  "microsoft-xbox-360": "microsoft-xbox-360",
  "microsoft-xbox-one": "microsoft-xbox-one",
  "microsoft-xbox-series-x": "microsoft-xbox-series-x",
  "microsoft-xbox-series-s": "microsoft-xbox-series-s",
  "neo-geo": "neo-geo",
  "neo-geo-pocket": "neo-geo-pocket",
  "neo-geo-pocket-color": "neo-geo-pocket-color",
  "turbo-grafx-16": "turbo-grafx-16",
  "pc-engine": "pc-engine",
  "coleco-colecovision": "coleco-colecovision",
  "mattel-intellivision": "mattel-intellivision",
  "magnavox-odyssey": "magnavox-odyssey",
  "philips-cdi": "philips-cdi",
  "3do": "3do",
  "amiga-cd32": "amiga-cd32",
  "atari-jaguar-cd": "atari-jaguar-cd",
  "bandai-wonderswan": "bandai-wonderswan",
  "bandai-wonderswan-color": "bandai-wonderswan-color",
  "snk-neo-geo-cd": "snk-neo-geo-cd",
  "snk-neo-geo-aes": "snk-neo-geo-aes",
} as const;

export type Platform = keyof typeof platforms;

const platformExts: Record<Platform, string[]> = {
  "nintendo-entertainment-system": ["nes", "zip"],
  "atari-2600": ["bin", "a26", "rom", "zip"],
  "nintendo-gameboy-advance": ["gba", "zip"],
  "nintendo-gameboy": ["gb", "zip"],
  "nintendo-gameboy-color": ["gbc", "zip"],
  "atari-5200": ["a52", "bin", "zip"],
  "atari-7800": ["a78", "bin", "zip"],
  "atari-jaguar": ["j64", "bin", "zip"],
  "atari-lynx": ["lnx", "zip"],
  "super-nintendo-entertainment-system": ["sfc", "smc", "zip"],
  "nintendo-64": ["n64", "v64", "z64", "zip"],
  "nintendo-gamecube": ["iso", "gcm"],
  "nintendo-wii": ["iso", "wbfs"],
  "nintendo-wii-u": ["wud", "rpx", "iso"],
  "nintendo-switch": ["nsp", "xci"],
  "nintendo-ds": ["nds", "zip"],
  "nintendo-3ds": ["3ds", "cia"],
  "sega-master-system": ["sms", "zip"],
  "sega-genesis": ["md", "smd", "bin", "zip"],
  "sega-cd": ["iso", "bin", "cue"],
  "sega-32x": ["32x", "bin", "zip"],
  "sega-saturn": ["iso", "bin", "cue"],
  "sega-dreamcast": ["cdi", "gdi", "bin", "cue"],
  "sega-game-gear": ["gg", "zip"],
  "sony-playstation": ["iso", "bin", "cue"],
  "sony-playstation-2": ["iso", "bin"],
  "sony-playstation-3": ["iso", "pkg"],
  "sony-playstation-4": ["pkg"],
  "sony-playstation-5": ["pkg"],
  "sony-psp": ["iso", "cso"],
  "sony-ps-vita": ["vpk", "mai"],
  "microsoft-xbox": ["iso", "xbe"],
  "microsoft-xbox-360": ["iso", "xex"],
  "microsoft-xbox-one": ["iso", "xex"],
  "microsoft-xbox-series-x": ["iso", "xex"],
  "microsoft-xbox-series-s": ["iso", "xex"],
  "neo-geo": ["neo", "zip"],
  "neo-geo-pocket": ["ngp", "zip"],
  "neo-geo-pocket-color": ["ngc", "zip"],
  "turbo-grafx-16": ["pce", "zip"],
  "pc-engine": ["pce", "zip"],
  "coleco-colecovision": ["col", "zip"],
  "mattel-intellivision": ["int", "bin", "zip"],
  "magnavox-odyssey": ["bin", "zip"],
  "philips-cdi": ["cdi", "bin", "iso"],
  "3do": ["iso", "bin", "cue"],
  "amiga-cd32": ["iso", "bin", "cue"],
  "atari-jaguar-cd": ["jcd", "bin", "iso"],
  "bandai-wonderswan": ["ws", "zip"],
  "bandai-wonderswan-color": ["wsc", "zip"],
  "snk-neo-geo-cd": ["iso", "bin", "cue"],
  "snk-neo-geo-aes": ["neo", "zip"],
};

export type ScannerObj = Record<string, Platform>;

const gameDirectoryToScannerObj = (dir: string): ScannerObj =>
  pipe(
    dir,
    getTopLevelDirectories,
    filter((platform) => platform in platforms),
    map((platform) => [path.join(dir, platform), platform]),
    reduce({}, (obj, [dir, platform]) => ({
      ...obj,
      [dir]: platform,
    })),
  );

export type LinuxHostMethods = {
  "@elevate/linux/resolution/set"(params: ResolutionSetParams): string;
  "@elevate/core/releases/scan"(): void;
  "@elevate/core/releases/launch"(id: string): Promise<number | null>;
  // "@elevate/core/releases/fetch"(filterObj: any): Release[];
} & NodeMethods;

export const install: MutateJsonRpcServer = (
  server,
  {
    log,
    // buildFilter,
    // data,
    ...elevateContext
  },
) => {
  server.applyMiddleware(async (next, request, serverParams) => {
    log.info("JSON RPC: Request", request);

    return next(request, serverParams).then((response) => {
      log.info("JSON RPC: Response", response);

      return response;
    });
  });

  server.addMethod("@elevate/core/releases/scan", (_, context) => {
    // HACK: Hardcoded
    const root = "/glacier/snowscape/gaming/games";

    // const upsertResourceFound = async (found: ResourceFound): Promise<void> => {
    //   data.db.transaction(async (trx) => {
    //     const resource = await data.models.Resource.query(trx)
    //       .upsertGraphAndFetch(
    //         {
    //           // explicit id required
    //           id: generateRandomString(8),
    //           uri: found.path,
    //           platform: {
    //             code: found.platform,
    //           },
    //         },
    //         {
    //           update: false,
    //           noUpdate: true,
    //           insertMissing: true,
    //           relate: true,
    //         },
    //       )
    //       .withGraphFetched("releases");

    //     if (resource.releases.length > 0) return;

    //     await Release.query(trx).upsertGraphAndFetch(
    //       {
    //         name: path.parse(resource.uri).name,
    //         platform: resource.platform,
    //         resources: [{ id: resource.id }],
    //       },
    //       {
    //         update: false,
    //         noUpdate: true,
    //         insertMissing: true,
    //         relate: true,
    //       },
    //     );
    //   });
    // };

    // const q: queueAsPromised = fastq(upsertResourceFound, 1);
    // const events = pipe(root, gameDirectoryToScannerObj, strictResourceScanner);

    // events.on("resource", (game) =>
    //   q.push(game).catch((err) => log.error(err)),
    // );

    // events.on(
    //   "end",
    //   () =>
    //     getClient(context)?.notify(
    //       "@elevate/core/releases/scan/complete",
    //       undefined,
    //     ),
    // );
  });

  // server.addMethod(
  //   "@elevate/core/releases/fetch",
  //   // @ts-ignore
  //   async (obj: any) =>
  //     buildFilter<Release, typeof Release>(Release)
  //       .build(obj)
  //       .whereExists(Release.relatedQuery("resources"))
  //       .withGraphFetched("resources")
  //       .withGraphFetched("platform"),
  // );

  server.addMethod("@elevate/core/releases/launch", async (id, params) => {
    // const release = await Release.query()
    //   .findById(id)
    //   .withGraphFetched("resources")
    //   .withGraphFetched("platform");

    // if (!release) {
    //   const command = await elevateContext.launchers.steam.buildLaunchCmd(
    //     {
    //       id,
    //     } as unknown as Release,
    //     {},
    //   );

    //   command &&
    //     startApplication(command, {
    //       events: {
    //         onStart: (pid) => {
    //           const message = `App opened [${pid}]: Steam - ${id}`;

    //           log.info(message);
    //           getClient(params)?.notify("echo", { message });
    //         },
    //         onStop: (pid) => {
    //           const message = `App closed [${pid}]: Steam - ${id}`;

    //           log.info(message);
    //           getClient(params)?.notify("echo", { message });
    //         },
    //       },
    //     });

    //   return null;
    // }

    // const launchers = Object.entries(elevateContext.launchers).find(
    //   ([, addon]) => addon.platforms.includes(release.platform.code),
    // );

    // const command = await launchers?.[1]?.buildLaunchCmd(release, {});

    // command &&
    //   startApplication(command, {
    //     events: {
    //       onStart: (pid) => {
    //         const message = `App opened [${pid}]: ${release.name}`;

    //         log.info(message);
    //         getClient(params)?.notify("echo", { message });
    //       },
    //       onStop: (pid) => {
    //         const message = `App closed [${pid}]: ${release.name}`;

    //         log.info(message);
    //         getClient(params)?.notify("echo", { message });
    //       },
    //     },
    //   });

    return null;
  });

  return server;
};

export default install;
