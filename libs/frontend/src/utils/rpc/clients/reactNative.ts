import {
  JSONRPCRequest,
  TypedJSONRPCServer,
} from "json-rpc-2.0";
import { NodeMethods } from "../../../../../utils/types";
import { LinuxHostMethods } from "@elevate/service/src/plugins/core/index.ts";
import { create as createNode } from "../../../../../utils/jsonRPC/node.ts";

export type FrontendMethods = NodeMethods;
export type AndroidHostMethods = NodeMethods;
export type HostMethods = LinuxHostMethods | AndroidHostMethods;

declare global {
  interface Window {
    /**
     * A convenience API that we seem to expose in iOS.
     * Not sure whether Android does the same.
     * @see: https://github.com/react-native-community/react-native-webview/blob/25552977852427cf5fdc7b233fd1bbc7c77c18b0/ios/RNCWebView.m#L1128-L1146
     */
    ReactNativeWebView: {
      postMessage(msg: string): void;
    };

    receiveMessageFromReactNative(msg: JSONRPCRequest): void;
  }
}

export const createClient = (rpcServer: TypedJSONRPCServer<NodeMethods>) => {
  return createNode<AndroidHostMethods>(
    rpcServer,
    {},
    {
      send: (request) => window.ReactNativeWebView.postMessage(request),
      receive: (callback) =>
        (window.receiveMessageFromReactNative = (data) => callback(data)),
    }
  );
};
