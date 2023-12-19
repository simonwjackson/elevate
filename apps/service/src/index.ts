import express from "express";
import { createServer } from "node:http";
import { Server as SocketIoServer } from "socket.io";

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

io.on("connection", (socket) => {
  console.log("a user connected");
});

httpServer.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
