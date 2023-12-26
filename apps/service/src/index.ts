import express from "express";
import { createServer } from "node:http";
import { Server as SocketIoServer } from "socket.io";
import { createSocketIoJsonRpcServer } from "./jsonRpc";
import klaw from "klaw";
import { basename } from "path";
import through2 from "through2";
import db from "@elevate/db";
import Resource from "@elevate/db/models/Resource";

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

// Example usage:
const randomString = generateRandomString(10); // Generates a random string of length 10
console.log(randomString);

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

  return klaw(root, { filter: filterFunc })
    .pipe(excludeDirFilter)
    .pipe(buildGameObj)
    .on("data", async (item) => {
      try {
        await db.transaction(async (trx) => {
          const res = await Resource.query(trx).upsertGraphAndFetch(
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
          );

          console.log(res);
        });
      } catch (err) {
        console.error(err);
      }
    });
};

const app = express();
const httpServer = createServer(app);
const io = new SocketIoServer(httpServer, {
  cors: {
    origin: "*",
  },
});

app.get("/", (_, res) => {
  res.send("<h1>Hello world</h1>");
});

const { onConnect } = createSocketIoJsonRpcServer(io);

io.on("connection", onConnect);

httpServer.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});

// HACK: Hardcoded
const root = "/glacier/snowscape/gaming/games";

strictGameScanner(root);
