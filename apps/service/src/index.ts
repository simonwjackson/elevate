import { promisify } from "util";
const exec = promisify(require("child_process").exec);

import {
  JSONRPCResponse,
  JSONRPCServer,
  TypedJSONRPCServer,
  isJSONRPCRequest,
} from "json-rpc-2.0";

type BasicEcho = { message: string };

type JsonRPCMethods = {
  echo(params: BasicEcho): string;
  "resolution/set"(params: { monitor?: string; x: number; y: number }): string;
  launch(params: LaunchMessage): string;
};

type LaunchMessage = {
  id: number;
};

type ResolutionMessage = {
  topic: "resolution";
  payload: {
    resolution: string;
  };
};

type Message = LaunchMessage | ResolutionMessage;

type _Game = {
  title: string;
};

type SteamGame = {
  platform: "steam";
  meta?: {
    steamAppId?: number;
  };
} & _Game;

type RetrorchGame = {
  platform:
    | "nintendo-entertainment-system"
    | "nintendo-super-entertainment-system";
} & _Game;

type Game = SteamGame | RetrorchGame;

const gameDb: Record<string, Game> = {
  fsd8j: {
    platform: "steam",
    title: "Rouge Legacy 2",
    meta: {
      steamAppId: 1253920,
    },
  },
};

const state = {
  monitor: "DP-2-3",
};

const setResolution = async (monitor: string, x: number, y: number) => {
  // TODO: validate resolution
  // TODO: validate monitor

  const command = `xrandr -display :0 --output ${monitor} --mode ${x}x${y}`;

  return exec(command);
};

function runSteamApp(appId: number) {
  const command = `flatpak run com.valvesoftware.Steam "steam://rungameid/${appId}"`;

  return exec(command);
}

const parseLaunch = (payload: LaunchMessage) => {
  const game = gameDb[payload.id];

  switch (game.platform) {
    case "steam": {
      return runSteamApp(game.meta.steamAppId);
    }
    default:
    case "nintendo-entertainment-system": {
      return "";
    }
  }
};

const rpcServer: TypedJSONRPCServer<JsonRPCMethods> = new JSONRPCServer();

const server = Bun.serve({
  port: 3000,
  fetch(req, server) {
    const url = new URL(req.url);
    if (url.pathname === "/socket") {
      console.log(`upgrade!`);

      const success = server.upgrade(req);
      return success
        ? undefined
        : new Response("WebSocket upgrade error", { status: 400 });
    }

    return new Response("Hello world");
  },
  websocket: {
    open(ws) {
      console.log("open");
      const msg = `has entered the chat`;

      ws.subscribe("game");
      ws.publish("game", msg);
    },
    message(ws, payload) {
      if (typeof payload === "string") {
        const obj = JSON.parse(payload);

        if (isJSONRPCRequest(obj)) {
          rpcServer.receive(obj).then((x) => x);
        }
      }
    },
    close(ws) {
      console.log("close");
      const msg = `has left the chat`;

      ws.unsubscribe("game");
      server.publish("game", msg);
    },
  },
});

rpcServer.addMethod("echo", ({ message }) => message);
rpcServer.addMethod("launch", parseLaunch);
rpcServer.addMethod("resolution/set", ({ x, y }) =>
  setResolution(state.monitor, x, y),
);

const logMiddleware = (next, request, serverParams) => {
  console.log(`Received ${JSON.stringify(request)}`);

  return next(request, serverParams).then((response) => {
    console.log(`Responding ${JSON.stringify(response)}`);
    return response;
  });
};

rpcServer.applyMiddleware(logMiddleware);

console.log(`Listening on http://localhost:${server.port} ...`);
