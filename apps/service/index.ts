import { exec } from "child_process";

type Message = {
  topic: "launch";
  payload: {
    id: number;
  };
};

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

const parseLaunch = (payload: Message["payload"]) => {
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
