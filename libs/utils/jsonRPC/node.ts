import {
  JSONRPCClient,
  JSONRPCRequest,
  JSONRPCResponse,
  TypedJSONRPCClient,
  TypedJSONRPCServer,
  isJSONRPCID,
  isJSONRPCRequest as isRequest,
  isJSONRPCResponse as isResponse,
} from "json-rpc-2.0";
import { pipe } from "fp-ts/lib/function";

type MethodsType = Record<string, (params?: any) => any>;
type SendCallback = (request: string) => void;
type JSONRPCMessage = JSONRPCRequest | JSONRPCResponse;

type Messages = {
  send: SendCallback;
  receive: (process: (data: JSONRPCResponse) => void) => void;
};

const isNotification = (data: JSONRPCMessage) =>
  isRequest(data) && !isJSONRPCID(data.id);

const expectingReply = (data: JSONRPCMessage) => !isNotification(data);

const sendMessage = (send: SendCallback) => (request: JSONRPCRequest) => {
  try {
    send(JSON.stringify(request));
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const create = <T extends MethodsType, U>(
  server: TypedJSONRPCServer<T, U>,
  serverParams: U,
  messages: Messages,
) => {
  const client: TypedJSONRPCClient<T> = new JSONRPCClient(
    pipe(messages.send, sendMessage),
  );

  messages.receive(async (data) => {
    if (isRequest(data)) {
      const result = await server.receive(data, serverParams);
      console.log({ result });

      if (expectingReply(data)) {
        pipe(result, JSON.stringify, messages.send);
      }
    } else if (isResponse(data)) {
      client.receive(data);
    }

    // WARNING: Batch messages will not be processed
    // WARNING: What other messages need to be handled here.
  });

  return client;
};
