import {
  JSONRPCRequest,
  TypedJSONRPCServer,
  isJSONRPCRequest,
  isJSONRPCResponse,
} from "json-rpc-2.0";
import { JSONRPCClient, TypedJSONRPCClient } from "json-rpc-2.0";
import { LinuxHostMethods } from "../../../../../service/src/utils/index.ts";
import { NodeMethods } from "../../../../../../types";
import { createJSONRPCClient } from "./utils.ts";

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
  return createJSONRPCClient<AndroidHostMethods>(
    rpcServer,
    (request) => window.ReactNativeWebView.postMessage(request),
    (callback) =>
      (window.receiveMessageFromReactNative = (data) => callback(data)),
  );
};
