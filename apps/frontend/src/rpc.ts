import { TypedJSONRPCServer } from "json-rpc-2.0";
import { TypedJSONRPCClient } from "json-rpc-2.0";
import { LinuxHostMethods } from "../../service/src/utils/index.ts";
import { createClient as createReactNativeClient } from "./utils/rpc/clients/reactNative.ts";
import { NodeMethods } from "../../../types";
import { createWebSocketClient } from "./utils/rpc/clients/webSocket.ts";

export type FrontendMethods = NodeMethods;
export type AndroidHostMethods = NodeMethods;
export type HostMethods = LinuxHostMethods | AndroidHostMethods;

type Host = {
  rpcClient: TypedJSONRPCClient<LinuxHostMethods>;
  hasStreaming: boolean;
  isHeadless: boolean;
  os: "linux" | "android";
};

export const buildHosts = (rpcServer: TypedJSONRPCServer<NodeMethods>) => {
  const hosts: Record<string, Host> = {
    fiji: {
      rpcClient: createWebSocketClient(rpcServer, "fiji", 3000),
      hasStreaming: true,
      isHeadless: false,
      os: "linux",
    },
    zao: {
      rpcClient: createWebSocketClient(rpcServer, "zao", 3000),
      hasStreaming: true,
      isHeadless: true,
      os: "linux",
    },
    yari: {
      rpcClient: createReactNativeClient(rpcServer),
      hasStreaming: false,
      isHeadless: false,
      os: "android",
    },
  };

  return hosts;
};
