import { TypedJSONRPCServer } from "json-rpc-2.0";
import { NodeMethods } from "../../../../../../types";
import { LinuxHostMethods } from "../../../../../service/src/utils";
import { createJSONRPCClient } from "./utils";

export type FrontendMethods = NodeMethods;
export type AndroidHostMethods = NodeMethods;
export type HostMethods = LinuxHostMethods | AndroidHostMethods;

export const createWebSocketClient = (
  rpcServer: TypedJSONRPCServer<NodeMethods>,
  host: string,
  port: number,
) => {
  const socket = new WebSocket(`ws://${host}:${port}/socket`);

  const client = createJSONRPCClient<LinuxHostMethods>(
    rpcServer,
    (request) => socket.send(request),
    (onRpcMessage) =>
      (socket.onmessage = (event) =>
        onRpcMessage(JSON.parse(event.data.toString()))),
  );

  socket.onclose = (event) => {
    client.rejectAllPendingRequests(`Connection is closed (${event.reason}).`);
  };

  return client;
};
