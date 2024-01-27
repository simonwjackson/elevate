import { TypedJSONRPCServer } from "json-rpc-2.0";
import { TypedJSONRPCClient } from "json-rpc-2.0";
import { create as createWebSocketClientNode } from "../../../libs/utils/jsonRPC/webSockets/clientNode.ts";
import type { ServerParams } from "@elevate/utils/jsonRPC/webSockets/serverNode";
import { NodeMethods } from "@elevate/utils/types";
import { LinuxHostMethods } from "../../service/src/utils/misc.ts";
import { createClient as createReactNativeClient } from "./utils/rpc/clients/reactNative.ts";

export type FrontendMethods = NodeMethods;
export type AndroidHostMethods = NodeMethods;
export type HostMethods = LinuxHostMethods | AndroidHostMethods;

type Node = {
  rpcClient: TypedJSONRPCClient<LinuxHostMethods>;
  hasStreaming: boolean;
  isHeadless: boolean;
  os: "linux" | "android";
};

export const connectToNodes = (rpcNode: TypedJSONRPCServer<NodeMethods, ServerParams>) =>
  ({
    // fiji: {
    //   rpcClient: createWebSocketClientNode(rpcNode, "fiji", 3000),
    //   hasStreaming: true,
    //   isHeadless: false,
    //   os: "linux",
    // },
    // zao: {
    //   rpcClient: createWebSocketClient(rpcServer, "zao", 3000),
    //   hasStreaming: true,
    //   isHeadless: true,
    //   os: "linux",
    // },
    yari: {
      rpcClient: createReactNativeClient(rpcNode),
      hasStreaming: false,
      isHeadless: false,
      os: "android",
    },
  }) as Record<string, Node>;
