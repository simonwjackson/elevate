import express from "express";
import { createServer } from "node:http";
import { createSocketIoJsonRpcServer } from "./jsonRpc";
import { WebSocketServer } from "ws";

const app = express();
const httpServer = createServer(app);

const wss = new WebSocketServer({ server: httpServer });

app.get("/", (_, res) => {
  res.send("<h1>Hello world</h1>");
});

const { onConnect } = createSocketIoJsonRpcServer(wss);

wss.on("connection", onConnect);

httpServer.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
