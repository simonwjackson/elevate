import {
  JSONRPCClient,
  TypedJSONRPCClient,
  TypedJSONRPCServer,
  isJSONRPCID,
  isJSONRPCRequest,
  isJSONRPCResponse,
} from "json-rpc-2.0";
import { NodeMethods } from "../../../../../../types";

type MethodsType = Record<string, (params?: any) => any>;

export function createJSONRPCClient<T extends MethodsType>(
  rpcServer: TypedJSONRPCServer<NodeMethods>,
  sendMessage: (request: string) => void,
  onMessage: (callback: (data: any) => void) => void,
) {
  const jsonRpcClient: TypedJSONRPCClient<T> = new JSONRPCClient((request) => {
    try {
      sendMessage(JSON.stringify(request));
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  });

  onMessage((data) => {
    if (isJSONRPCRequest(data)) {
      rpcServer.receive(data).then((response) => {
        if (isJSONRPCID(data.id)) sendMessage(JSON.stringify(response));
      });
    } else if (isJSONRPCResponse(data)) {
      jsonRpcClient.receive(data);
    }
  });

  return jsonRpcClient;
}
