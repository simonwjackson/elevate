import type { WebSocket, Server } from "ws";
import {
  JSONRPCClient,
  JSONRPCServer,
  JSONRPCServerMiddleware,
  TypedJSONRPCClient,
  TypedJSONRPCServer,
  isJSONRPCRequest,
  isJSONRPCResponse,
} from "json-rpc-2.0";
import { NodeMethods } from "../../../types";
import { LinuxHostMethods, launch } from "./utils";
import Release from "@elevate/db/models/Release";
import { strictGameScanner } from "./utils/fileScanner";
import { buildFilter } from "objection-filter";

const logMiddleware: JSONRPCServerMiddleware<String> = async (
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

const buildJsonRpcServer = () => {
  const jsonRpcServer: TypedJSONRPCServer<LinuxHostMethods, String> =
    new JSONRPCServer();

  jsonRpcServer.applyMiddleware(logMiddleware);

  jsonRpcServer.addMethod("scanReleases", () => {
    // HACK: Hardcoded
    const root = "/glacier/snowscape/gaming/games";

    strictGameScanner(root);
    return "ok";
  });

  jsonRpcServer.addMethod(
    "getAllReleases",
    // @ts-ignore
    async (obj: any, y: string) => {
      console.log(y);
      const x = await buildFilter<Release, typeof Release>(Release)
        .build(obj)
        .whereExists(Release.relatedQuery("resources"))
        .withGraphFetched("resources")
        .withGraphFetched("platform")
        .debug()
        .catch(console.error);

      return x;
    },
  );

  jsonRpcServer.addMethod("launch", launch);

  // jsonRpc.addMethod("resolution/set", ({ x, y }) =>
  //   setResolution(state.monitor, x, y),
  // );
  //
  return jsonRpcServer;
};
export const createSocketIoJsonRpcServer = (wss: Server) => {
  const peers = new Map<string, { client: JSONRPCClient }>();
  const jsonRpcServer = buildJsonRpcServer();

  jsonRpcServer.applyMiddleware(async (next, request, serverParams) =>
    next(request, "boo"),
  );

  const onDisconnect = (clientId: string) => async () => {
    // const sockets = await io.in(clientId).fetchSockets();
    // if (sockets.length === 0 && clientId) {
    //   peers.delete(clientId);
    // }
  };

  const onConnect = (socket: WebSocket) => {
    const clientId = `${Math.random()}`;
    console.log(`connection: ${clientId}`);

    const client: TypedJSONRPCClient<NodeMethods> = new JSONRPCClient(
      (request) => {
        try {
          socket.send(JSON.stringify(request));

          return Promise.resolve();
        } catch (error) {
          console.error(error);
          return Promise.reject(error);
        }
      },
    );

    client.notify("auth", { clientId });

    socket.on("disconnect", onDisconnect(clientId));

    socket.on("message", (message) => {
      const payload = message.toString();
      const obj = JSON.parse(payload);

      // The message is a request from the peer, we need to process it
      if (isJSONRPCRequest(obj)) {
        jsonRpcServer.receive(obj).then((response) => {
          socket.send(JSON.stringify(response));
        });
      }

      // This is a direct response to a query made from the service
      else if (isJSONRPCResponse(obj)) {
        peers.get(clientId)?.client.receive(obj);
      }

      // WARNING: Batch messages will not be processed
      // WARNING: What other messages need to be handled here.
    });

    peers.set(clientId, {
      client,
    });

    return clientId;
  };

  return {
    peers,
    onConnect,
  };
};
