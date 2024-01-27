import express from "express";
import { createServer } from "node:http";
import { create as createWebSocketServerNode } from "../../../libs/utils/jsonRPC/webSockets/serverNode";
import { WebSocketServer } from "ws";
import { buildJsonRpcServer } from "./utils/jsonRPC/buildServer";
import core from "./plugins/core/index";
import { LauncherAddon, addPlugin } from "./utils/plugins/addLauncher";
import log from "../../../libs/utils/logger";
import retroarchPlugin from "./plugins/retroarch";
import steamPlugin from "./plugins/steam";
import {createDb} from "./db";
import path from 'path'

const app = express();
const httpServer = createServer(app);



export type ElevateContext = ReturnType<typeof buildContext>;

const buildContext = async () => ({
  log,
  // buildFilter,
  data: {
    db: await createDb(),
    // models: {
    //   Release,
    //   Resource,
    // },
  },
  launchers: {} as Record<string, LauncherAddon>,
});

const context = await buildContext();

addPlugin(retroarchPlugin, context);
addPlugin(steamPlugin, context);

createWebSocketServerNode({
  events: {
    disconnect: log.info,
    connect: log.info,
  },
  webSocketServer: new WebSocketServer({ port: 5000 }),
  jsonRpcServer: buildJsonRpcServer(context, [core]),
});

if (process.env.NODE_ENV === "production") {
  app.use('/', express.static(path.join(__dirname, '../../../libs/frontend/dist')))

  httpServer.listen(31348, () => {
    log.info('Elevate is running @ http://localhost:31348') 
  });
}