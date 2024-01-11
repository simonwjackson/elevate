import { MutateJsonRpcServer } from "../../utils/jsonRPC/buildServer";
import { ResourceFound, strictResourceScanner } from "@elevate/utils/files";
import { generateRandomString } from "@elevate/utils/misc";
import { getClient } from "../../utils/jsonRPC/misc";
import { launch } from "../../utils/misc";
import { ResolutionSetParams } from "../../utils/misc";
import Release from "@elevate/db/models/Release";
import { NodeMethods } from "@elevate/utils/types";
import * as fs from "fs";
import * as path from "path";
import { pipe } from "fp-ts/lib/function";
import { filter, map, reduce } from "fp-ts/lib/Array";
import { promise as fastq, queueAsPromised } from "fastq";

const getTopLevelDirectories = (dir: string): string[] =>
  fs
    .readdirSync(dir)
    .filter((file) => fs.statSync(path.join(dir, file)).isDirectory());

const platforms = {
  "nintendo-entertainment-system": "nintendo-entertainment-system",
  "atari-2600": "atari-2600",
  "nintendo-gameboy-advance": "nintendo-gameboy-advance",
  "nintendo-gameboy": "nintendo-gameboy",
  "nintendo-gameboy-color": "nintendo-gameboy-color",
} as const;

export type Platform = keyof typeof platforms;

const platformExts: Record<Platform, string[]> = {
  "nintendo-entertainment-system": ["nes", "zip"],
  "atari-2600": [],
  "nintendo-gameboy-advance": ["gba"],
  "nintendo-gameboy": ["gb"],
  "nintendo-gameboy-color": ["gbc"],
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
  "@elevate/core/releases/launch"(release: Release): Promise<number | null>;
  "@elevate/core/releases/fetch"(filterObj: any): Release[];
} & NodeMethods;

export const install: MutateJsonRpcServer = (
  server,
  { log, buildFilter, data },
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

    const upsertResourceFound = async (found: ResourceFound): Promise<void> => {
      data.db.transaction(async (trx) => {
        const resource = await data.models.Resource.query(trx)
          .upsertGraphAndFetch(
            {
              // explicit id required
              id: generateRandomString(8),
              uri: found.path,
              platform: {
                code: found.platform,
              },
            },
            {
              update: false,
              noUpdate: true,
              insertMissing: true,
              relate: true,
            },
          )
          .withGraphFetched("releases");

        if (resource.releases.length > 0) return;

        await Release.query(trx).upsertGraphAndFetch(
          {
            name: path.parse(resource.uri).name,
            platform: resource.platform,
            resources: [{ id: resource.id }],
          },
          {
            update: false,
            noUpdate: true,
            insertMissing: true,
            relate: true,
          },
        );
      });
    };

    const q: queueAsPromised = fastq(upsertResourceFound, 1);
    const events = pipe(root, gameDirectoryToScannerObj, strictResourceScanner);

    events.on("resource", (game) =>
      q.push(game).catch((err) => log.error(err)),
    );
    events.on(
      "end",
      () => getClient(context)?.notify("@elevate/core/releases/scan/complete", undefined),
    );
  });

  server.addMethod(
    "@elevate/core/releases/fetch",
    // @ts-ignore
    async (obj: any) =>
      buildFilter<Release, typeof Release>(Release)
        .build(obj)
        .whereExists(Release.relatedQuery("resources"))
        .withGraphFetched("resources")
        .withGraphFetched("platform"),
  );

  server.addMethod("@elevate/core/releases/launch", async (release, params) =>
    launch(release, {
      events: {
        onStart: log.info,
        onStop: (pid) => {
          getClient(params)?.notify("echo", {
            message: `App closed: ${pid}`,
          });
        },
      },
    }),
  );

  return server;
};

export default install;
