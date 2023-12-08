import { exec } from "child_process";
const { JSONRPCServer } = require("json-rpc-2.0");

const rpcServer = new JSONRPCServer();

// First parameter is a method name.
// Second parameter is a method itself.
// A method takes JSON-RPC params and returns a result.
// It can also return a promise of the result.
rpcServer.addMethod("echo", ({ text }) => text);
rpcServer.addMethod("log", ({ message }) => console.log(message));

const logMiddleware = (next, request, serverParams) => {
  console.log(`Received ${JSON.stringify(request)}`);

  return next(request, serverParams).then((response) => {
    console.log(`Responding ${JSON.stringify(response)}`);
    return response;
  });
};

rpcServer.applyMiddleware(logMiddleware);

type LaunchMessage = {
  topic: "launch";
  payload: {
    id: number;
  };
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

function runSteamApp(appId: number) {
  const command = `flatpak run com.valvesoftware.Steam "steam://rungameid/${appId}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

const setResolution = (resolution: string) => {
  // TODO: validate resolution

  const command = `xrandr -display :0 --output DP-2-3 --mode ${resolution}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
};

const parseLaunch = (payload: LaunchMessage["payload"]) => {
  const game = gameDb[payload.id];

  switch (game.platform) {
    case "steam": {
      runSteamApp(game.meta.steamAppId);
    }
    case "nintendo-entertainment-system": {
    }
  }
};

const handleMessage = (message: Message) => {
  switch (message.topic) {
    case "launch": {
      parseLaunch(message.payload);
    }
    case "resolution": {
      if ("resolution" in message.payload)
        setResolution(message.payload.resolution);
    }
  }
};

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
    message(_, message) {
      if (typeof message === "string") {
        const obj = JSON.parse(message);
        handleMessage(obj);
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

console.log(`Listening on http://localhost:${server.port} ...`);
