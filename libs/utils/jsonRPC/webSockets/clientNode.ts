import {
  JSONRPCRequest,
  JSONRPCResponse,
  TypedJSONRPCServer,
} from "json-rpc-2.0";
import { NodeMethods } from "../../../../types";
import { LinuxHostMethods } from "../../../../apps/service/src/utils/misc";
import { flow, pipe } from "fp-ts/function";
import { create as createJsonRpc } from "../node";

export type FrontendMethods = NodeMethods;
export type AndroidHostMethods = NodeMethods;
export type HostMethods = LinuxHostMethods | AndroidHostMethods;
export type JSONRPCMessage = JSONRPCRequest | JSONRPCResponse;
export type JSONRPCMessageEvent = MessageEvent<JSONRPCMessage>;

export const getJsonFromEvent = flow(
  (event: JSONRPCMessageEvent) => event.data.toString(),
  JSON.parse,
);

const trySendMessage = (socket: WebSocket, message: string) => {
  // try {
  socket.send(message);
  // } catch (error) {
  //   console.error(error);
  // }
};

export const create = (
  rpcServer: TypedJSONRPCServer<NodeMethods, undefined>,
  host: string,
  port: number,
) => {
  const socket = new WebSocket(`ws://${host}:${port}/socket`);

  const client = createJsonRpc<LinuxHostMethods, undefined>(
    rpcServer,
    undefined,
    {
      send: (request) => trySendMessage(socket, request),
      receive: (process) => {
        socket.onmessage = (e) => {
          pipe(e, getJsonFromEvent, process);
        };
      },
    },
  );

  socket.onclose = (event) => {
    client.rejectAllPendingRequests(`Connection is closed (${event.reason}).`);
  };

  return client;
};
