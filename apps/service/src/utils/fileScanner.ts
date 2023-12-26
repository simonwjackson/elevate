import { promise as fastq } from "fastq";
import klaw from "klaw";
import { parse, basename } from "path";
import through2 from "through2";
import db from "@elevate/db";
import Resource from "@elevate/db/models/Resource";
import type { queueAsPromised } from "fastq";
import Release from "@elevate/db/models/Release";

const asyncWorker = async (arg: any): Promise<void> => {
  try {
    await db.transaction(async (trx) => {
      if (arg.releases.length === 0) {
        await Release.query(trx).upsertGraphAndFetch(
          {
            name: parse(arg.uri).name,
            platform: arg.platform,
            resources: [{ id: arg.id }],
          },
          {
            update: false,
            noUpdate: true,
            insertMissing: true,
            relate: true,
          },
        );
      }
    });
  } catch (err) {
    console.info(arg);
    console.error(err);
  }
};

const q: queueAsPromised<any> = fastq(asyncWorker, 1);

const generateRandomString = (length: number): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export const strictGameScanner = (rootPath: string) => {
  const filterFunc = (item: string) => {
    const fileBasename = basename(item);

    if (item.includes("steam")) return false;

    return fileBasename === "." || fileBasename[0] !== ".";
  };

  const excludeDirFilter = through2.obj(function (item, enc, next) {
    if (!item.stats.isDirectory()) this.push(item);

    next();
  });

  const buildGameObj = through2.obj(function (item, enc, next) {
    const { path }: { path: string } = item;
    const platformCode = path.split(rootPath + "/", 2)[1].split("/")[0];

    this.push({
      code: platformCode,
      fullPath: path,
    });

    next();
  });

  return klaw(rootPath, { filter: filterFunc })
    .pipe(excludeDirFilter)
    .pipe(buildGameObj)
    .on("data", async (item) => {
      try {
        await db.transaction(async (trx) => {
          const res = await Resource.query(trx)
            .upsertGraphAndFetch(
              {
                id: generateRandomString(8),
                uri: item.fullPath,
                platform: {
                  code: item.code,
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

          q.push(res).catch((err) => console.error(err));
        });
      } catch (err) {
        console.error(err);
      }
    });
};
