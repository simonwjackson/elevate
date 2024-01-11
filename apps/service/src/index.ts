import express from "express";
import { createServer } from "node:http";
import { create as createWebSocketServerNode } from "@elevate/utils/jsonRPC/webSockets/serverNode";
import { WebSocketServer } from "ws";
import { buildJsonRpcServer } from "./utils/jsonRPC/buildServer";

import core from "./plugins/core/index"

const app = express();
const httpServer = createServer(app);

app.get("/", (_, res) => {
  res.send("<h1>Hello world</h1>");
});

createWebSocketServerNode({
  events: {
    disconnect: console.log,
    connect: console.log,
  },
  webSocketServer: new WebSocketServer({ server: httpServer }),
  jsonRpcServer: buildJsonRpcServer([core]),
});

httpServer.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
