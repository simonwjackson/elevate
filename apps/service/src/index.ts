import express from "express";
import { createServer } from "node:http";
import { Server as SocketIoServer } from "socket.io";
import { createSocketIoJsonRpcServer } from "./jsonRpc";

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
