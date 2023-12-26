import { Server, Socket } from "socket.io";
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

export const createSocketIoJsonRpcServer = (io: Server) => {
  const jsonRpcServer: TypedJSONRPCServer<LinuxHostMethods> =
    new JSONRPCServer();
  jsonRpcServer.applyMiddleware(logMiddleware);
  // jsonRpc.addMethod("gameScan", () => strictGameScanner());
  jsonRpcServer.addMethod("echo", ({ message }) => message);
  // jsonRpc.addMethod("launch", parseLaunch);
  // jsonRpc.addMethod("resolution/set", ({ x, y }) =>
  //   setResolution(state.monitor, x, y),
  // );

  const peers = new Map<string, { client: JSONRPCClient }>();

  const onDisconnect = (clientId: string) => async () => {
    const sockets = await io.in(clientId).fetchSockets();

    if (sockets.length === 0 && clientId) {
      peers.delete(clientId);
    }
  };

  const onConnect = (socket: Socket) => {
    const clientId = `${Math.random()}`;
    console.log(`connection: ${clientId}`);

    const client: TypedJSONRPCClient<NodeMethods> = new JSONRPCClient(
      (request) => {
        try {
          console.log(request);
          socket.send(request);

          return Promise.resolve();
        } catch (error) {
          return Promise.reject(error);
        }
      },
    );

    socket.on("disconnect", onDisconnect(clientId));

    socket.on("message", (payload) => {
      console.log(payload, typeof payload);

      if (typeof payload === "string") {
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
