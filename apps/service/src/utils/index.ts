import { readdirSync, statSync } from "fs";
import {
  JSONRPCClient,
  JSONRPCServer,
  JSONRPCServerMiddleware,
  TypedJSONRPCClient,
  TypedJSONRPCServer,
  isJSONRPCRequest,
  isJSONRPCResponse,
} from "json-rpc-2.0";
import { ServerWebSocket } from "bun";
import { gameDb } from "../fakeDb.ts";
import { runSteamApp, setResolution } from "./linux.ts";
import { NodeMethods } from "../../../../types.js";

export type LaunchParams = { id: number };
export type ResolutionSetParams = { monitor?: string; x: number; y: number };

export type LinuxHostMethods = {
  "resolution/set"(params: ResolutionSetParams): string;
  gameScan(): string;
  launch(params: LaunchParams): string;
} & NodeMethods;

// HACK:
const state = {
  monitor: "DP-2-3",
};

export const parseLaunch = (payload: LaunchParams) => {
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

const createJsonRpcWebSocketServer = () => {
  const logMiddleware: JSONRPCServerMiddleware<void> = async (
    next,
    request,
    serverParams,
  ) => {
    console.log(`Received ${JSON.stringify(request)}`);

    return next(request, serverParams).then((response) => {
      console.log(`Responding ${JSON.stringify(response)}`);
      return response;
    });
  };

  const peers = new Map<
    string,
    { client: JSONRPCClient; webSocket: ServerWebSocket }
  >();

  function getClientIdFromWebSocket(ws: ServerWebSocket) {
    for (const [clientId, client] of peers.entries()) {
      if (client.webSocket === ws) {
        return clientId;
      }
    }

    return null; // Or handle the case where the client ID is not found
  }

  function getClientFromWebSocket(ws: ServerWebSocket) {
    for (const [, peer] of peers.entries()) {
      if (peer.webSocket === ws) {
        return peer.client;
      }
    }

    return null; // Or handle the case where the client ID is not found
  }

  const jsonRpc: TypedJSONRPCServer<LinuxHostMethods> = new JSONRPCServer();

  jsonRpc.applyMiddleware(logMiddleware);

  jsonRpc.addMethod("gameScan", () => strictGameScanner());
  jsonRpc.addMethod("echo", ({ message }) => message);
  jsonRpc.addMethod("launch", parseLaunch);
  jsonRpc.addMethod("resolution/set", ({ x, y }) =>
    setResolution(state.monitor, x, y),
  );

  const webSocketEvents = {
    open: (webSocket: ServerWebSocket) => {
      console.log("open");
      const clientId = `${Math.random()}`;
      // TODO: These types should only represent frontend "server" methods
      const client: TypedJSONRPCClient<NodeMethods> = new JSONRPCClient(
        (request) => {
          try {
            console.log(request);
            webSocket.send(JSON.stringify(request));
            return Promise.resolve();
          } catch (error) {
            return Promise.reject(error);
          }
        },
      );

      peers.set(clientId, {
        client,
        webSocket,
      });
    },
    message: (ws: ServerWebSocket, payload: string | Buffer) => {
      if (typeof payload === "string") {
        const obj = JSON.parse(payload);

        // The message is a request from the peer, we need to process it
        if (isJSONRPCRequest(obj)) {
          jsonRpc.receive(obj).then((response) => {
            ws.sendText(JSON.stringify(response));
          });
        }

        // This is a direct response to a query made from the service
        else if (isJSONRPCResponse(obj)) {
          const client = getClientFromWebSocket(ws);
          if (client) client.receive(obj);
        }

        // WARNING: Batch messages will not be processed
        // WARNING: What other messages need to be handled here.
      }
    },
    close: (webSocket: ServerWebSocket) => {
      const clientId = getClientIdFromWebSocket(webSocket);
      if (clientId) peers.delete(clientId);
    },
  };

  return {
    peers,
    jsonRpc,
    webSocketEvents,
  };
};

export const createBunServer = () => {
  const { webSocketEvents, ...jsonRpcWebSocketServer } =
    createJsonRpcWebSocketServer();

  const httpWebSocket = Bun.serve({
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
    websocket: webSocketEvents,
  });

  return {
    ...jsonRpcWebSocketServer,
    httpWebSocket,
  };
};

export const scanFiles = (dirPath: string, ext: string[]): string[] => {
  let filesFound: string[] = [];

  try {
    const files = readdirSync(dirPath);

    for (const file of files) {
      const fullPath = `${dirPath}/${file}`;
      const fileStat = statSync(fullPath);

      if (fileStat.isDirectory()) {
        // If the file is a directory, recursively scan it
        filesFound = [...filesFound, ...scanFiles(fullPath, ext)];
      } else {
        // If the file is not a directory, check if it matches the extensions
        if (ext.some((extension) => file.endsWith(`.${extension}`))) {
          filesFound.push(fullPath);
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error);
  }

  return filesFound;
};

export const strictGameScanner = () => {
  // HACK: Hardcoded
  const root = "/glacier/snowscape/gaming/games";
  const platformMap = {
    "nintendo-gameboy": {
      paths: [`${root}/nintendo-gameboy`],
      ext: ["gb"],
    },
    "nintendo-gameboy-advance": {
      paths: [`${root}/nintendo-gameboy-advance`],
      ext: ["gba"],
    },
    "nintendo-gameboy-color": {
      paths: [`${root}/nintendo-gameboy-color`],
      ext: ["gbc"],
    },
    // "nintendo-gamecube": {
    //   paths: [`${root}/nintendo-gamecube`],
    //   ext: ["iso"],
    // },
    // "nintendo-wii": {
    //   paths: [`${root}/nintendo-wii`],
    //   ext: ["iso"],
    // },
    // "nintendo-wii-u": {
    //   paths: [`${root}/nintendo-wii-u`],
    //   ext: ["iso"],
    // },
  };

  const result = {};

  for (const platform in platformMap) {
    const { paths, ext } = platformMap[platform];
    result[platform] = paths.flatMap((path) => scanFiles(path, ext));
  }

  return result;
};
