import klaw from "klaw";
import through2 from "through2";
import { basename } from "path";

import { Platform, ScannerObj } from "@elevate/service/src/plugins/core";
import mitt from "mitt";

export type ResourceFound = {
  platform: Platform;
  path: string;
};

export const strictResourceScanner = (dirs: ScannerObj) => {
  const emitter = mitt<{
    resource: ResourceFound;
    end: undefined;
  }>();

  const filterFn = (item: string) => {
    const fileBasename = basename(item);

    return fileBasename === "." || fileBasename[0] !== ".";
  };

  const buildGameObj = (platform: Platform) =>
    through2.obj(function (item, enc, next) {
      const { path }: { path: string } = item;

      if (!item.stats.isDirectory()) {
        this.push({
          platform,
          path,
        } as ResourceFound);
      }

      next();
    });

  // PERF: this will scan each platform dir in paralell
  Object.entries(dirs).map(([dir, platform]) => {
    klaw(dir, { filter: filterFn })
      .pipe(buildGameObj(platform))
      .on("data", (game) => emitter.emit("resource", game))
      .on("end", () => emitter.emit("end"));
  });

  return emitter;
};
