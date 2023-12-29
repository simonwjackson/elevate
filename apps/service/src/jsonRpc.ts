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
import { LinuxHostMethods } from "./utils";
import Release from "@elevate/db/models/Release";
import { strictGameScanner } from "./utils/fileScanner";
import { buildFilter } from "objection-filter";

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

const buildJsonRpcServer = () => {
  const jsonRpcServer: TypedJSONRPCServer<LinuxHostMethods> =
    new JSONRPCServer();
  jsonRpcServer.applyMiddleware(logMiddleware);
  // jsonRpc.addMethod("gameScan", () => strictGameScanner());
  jsonRpcServer.addMethod("scanReleases", () => {
    // HACK: Hardcoded
    const root = "/glacier/snowscape/gaming/games";

    strictGameScanner(root);
    return "ok";
  });

  jsonRpcServer.addMethod(
    "getAllReleases",
    // @ts-ignore
    async () => {
      const x = await buildFilter<Release, typeof Release>(Release)
        .build({
          eager: {
            $where: {
              name: {
                $like: "%mario%",
              },
            },
          },
          // An objection.js order by expression
          // An array of dot notation fields to select on the root model and eagerly loaded models
          // fields: ["*"],
        })
        .whereExists(Release.relatedQuery("resources"))
        .withGraphFetched("resources")
        .withGraphFetched("platform")
        .debug();
      console.log(x);
      console.log(x.length);
      return x;
      // .catch(console.error);
    },
    // .then((customers) => res.send(customers)),
    // Release.query()
  );
  // jsonRpc.addMethod("launch", parseLaunch);
  // jsonRpc.addMethod("resolution/set", ({ x, y }) =>
  //   setResolution(state.monitor, x, y),
  // );

  return jsonRpcServer;
};

export const createSocketIoJsonRpcServer = (wss: Server) => {
  const jsonRpcServer = buildJsonRpcServer();
  const peers = new Map<string, { client: JSONRPCClient }>();

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
          socket.send(request);

          return Promise.resolve();
        } catch (error) {
          return Promise.reject(error);
        }
      },
    );

    socket.on("disconnect", onDisconnect(clientId));

    socket.on("message", (message) => {
      const payload = message.toString();

      console.log(payload, typeof payload);
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