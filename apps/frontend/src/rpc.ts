import {
  JSONRPCRequest,
  JSONRPCServer,
  TypedJSONRPCServer,
  isJSONRPCRequest,
  isJSONRPCResponse,
} from "json-rpc-2.0";
import { JSONRPCClient, TypedJSONRPCClient } from "json-rpc-2.0";
import {
  LinuxHostMethods,
  NodeMethods,
} from "../../service/src/utils/index.ts";

export type FrontendMethods = NodeMethods;
export type AndroidHostMethods = NodeMethods;
export type HostMethods = LinuxHostMethods | AndroidHostMethods;

export const createReactNativeJsonRpcNode = () => {
  const jsonRpcClient: TypedJSONRPCClient<AndroidHostMethods> =
    new JSONRPCClient((request) => {
      try {
        window.ReactNativeWebView.postMessage(JSON.stringify(request));
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    });

  if (!window.receiveMessageFromReactNative) {
    window.receiveMessageFromReactNative = (data: JSONRPCRequest) => {
      // The message is a request from the service, we need to process it
      if (isJSONRPCRequest(data)) {
        jsonRpcServer.receive(data).then((response) => {
          window.ReactNativeWebView.postMessage(JSON.stringify(response));
        });
      }

      // This is a direct response to a query made to the service
      else if (isJSONRPCResponse(data)) {
        jsonRpcClient.receive(data);
      }
    };
  }

  return jsonRpcClient;
};

export const createWebSocketJsonRpcNode = (
  rpcServer: TypedJSONRPCServer<NodeMethods>,
  host: string,
  port: number,
) => {
  const socket = new WebSocket(`ws://${host}:${port}/socket`);
  const client: TypedJSONRPCClient<LinuxHostMethods> = new JSONRPCClient(
    (request) => {
      try {
        socket.send(JSON.stringify(request));
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
  );

  socket.onmessage = (event) => {
    const obj = JSON.parse(event.data.toString());

    // The message is a request from the service, we need to process it
    if (isJSONRPCRequest(obj)) {
      rpcServer.receive(obj).then((response) => {
        socket.send(JSON.stringify(response));
      });
    }

    // This is a direct response to a query made to the service
    else if (isJSONRPCResponse(obj)) {
      client.receive(obj);
    }
  };

  socket.onclose = (event) => {
    client.rejectAllPendingRequests(`Connection is closed (${event.reason}).`);
  };

  return client;
};

export const createFrontendJsonRpcServer = () => {
  const jsonRpcServer: TypedJSONRPCServer<FrontendMethods> =
    new JSONRPCServer();

  jsonRpcServer.addMethod("echo", ({ message }) => message + "123");

  return jsonRpcServer;
};

type Host = {
  rpcClient: TypedJSONRPCClient<LinuxHostMethods>;
  hasStreaming: boolean;
  isHeadless: boolean;
  os: "linux" | "android";
};

export const buildHosts = (rpcServer: TypedJSONRPCServer<NodeMethods>) => {
  const hosts: Record<string, Host> = {
    fiji: {
      rpcClient: createWebSocketJsonRpcNode(rpcServer, "fiji", 3000),
      hasStreaming: true,
      isHeadless: false,
      os: "linux",
    },
    zao: {
      rpcClient: createWebSocketJsonRpcNode(rpcServer, "zao", 3000),
      hasStreaming: true,
      isHeadless: true,
      os: "linux",
    },
    yari: {
      rpcClient: createReactNativeJsonRpcNode(),
      hasStreaming: false,
      isHeadless: false,
      os: "android",
    },
  };

  return hosts;
};
