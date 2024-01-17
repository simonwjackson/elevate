import express from "express";
import { createServer } from "node:http";
import { create as createWebSocketServerNode } from "@elevate/utils/jsonRPC/webSockets/serverNode";
import { WebSocketServer } from "ws";
import { buildJsonRpcServer } from "./utils/jsonRPC/buildServer";
import core from "./plugins/core/index";
import { LauncherAddon, addLauncher, addPlugin } from "./utils/plugins/addLauncher";
import log from "@elevate/utils/logger";
import { buildFilter } from "objection-filter";
import db from "@elevate/db";
import Release from "@elevate/db/models/Release";
import Resource from "@elevate/db/models/Resource";
import retroarchPlugin from "./plugins/retroarch";
import steamPlugin from "./plugins/steam";

const app = express();
const httpServer = createServer(app);

app.get("/", (_, res) => {
  res.send("<h1>Hello world</h1>");
});

export type ElevateContext = ReturnType<typeof buildContext>

const buildContext = ()  => ({
  log,
  buildFilter,
  data: {
    db,
    models: {
      Release,
      Resource,
    },
  },
  launchers: {} as Record<string, LauncherAddon>
});

const context = buildContext()

addPlugin(retroarchPlugin, context)
addPlugin(steamPlugin, context)

createWebSocketServerNode({
  events: {
    disconnect: console.log,
    connect: console.log,
  },
  webSocketServer: new WebSocketServer({ server: httpServer }),
  jsonRpcServer: buildJsonRpcServer(context, [core]),
});

httpServer.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
