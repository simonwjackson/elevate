import type { WebSocket, Server, RawData, WebSocketServer } from "ws";
import {
  JSONRPCClient,
  JSONRPCRequest,
  JSONRPCResponse,
  TypedJSONRPCServer,
} from "json-rpc-2.0";
import { Request } from "express";
import { create as createJsonRpc } from "../node";
import { pipe } from "fp-ts/function";

export type MethodsType = Record<string, (params?: any) => any>;
export type Peers = Map<String, { client: JSONRPCClient }>;
export type ServerParams = {
  clientId: String;
  peers: Peers;
};
export type JSONRPCMessage = JSONRPCRequest | JSONRPCResponse;
export type JSONRPCMessageEvent = MessageEvent<JSONRPCMessage>;

const trySendMessage = (socket: WebSocket, message: string) => {
  try {
    socket.send(message);

    return Promise.resolve();
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const create = <T extends MethodsType>({
  events,
  webSocketServer,
  jsonRpcServer,
}: {
  events?: {
    disconnect?: (clientId: String) => void;
    connect?: (clientId: String) => void;
    // message?: (data: String) => void;
  };
  webSocketServer: WebSocketServer;
  jsonRpcServer: TypedJSONRPCServer<T, ServerParams>;
}) => {
  const peers = new Map<string, { client: JSONRPCClient }>();

  const onConnect = (socket: WebSocket, req: Request) => {
    const clientId = req.headers["sec-websocket-key"] as string;
    events?.connect?.(clientId);

    const client = createJsonRpc<T, ServerParams>(
      jsonRpcServer,
      { clientId, peers },
      {
        send: (request) => trySendMessage(socket, request),
        receive: (process) => {
          socket.on("message", (message) => {
            // events?.message(data);
            pipe(message.toString(), JSON.parse, process);
          });
        },
      },
    );

    socket.on("close", () => {
      peers.delete(clientId);
      events?.disconnect?.(clientId);
    });

    peers.set(clientId, {
      client,
    });
  };

  webSocketServer.on("connection", onConnect);

  return {
    peers,
  };
};
