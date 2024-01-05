import { JSONRPCServer, TypedJSONRPCServer } from "json-rpc-2.0";
import { NodeMethods } from "../../../../../../types";
import { LinuxHostMethods } from "../../../../../service/src/utils/misc";

export type FrontendMethods = NodeMethods;
export type AndroidHostMethods = NodeMethods;
export type HostMethods = LinuxHostMethods | AndroidHostMethods;

export const createServer = () => {
  const jsonRpcServer: TypedJSONRPCServer<FrontendMethods, string> =
    new JSONRPCServer();

  jsonRpcServer.addMethod("echo", ({ message }) => {
    console.log({ message });
    return message + "123";
  });

  // jsonRpcServer.addMethod("auth", ({ clientId }) => {
  // BUG: This wont work. frontend might be connected to several servers
  // const { setUser } = useUserStore.getState();
  // setUser({ id: clientId });
  // });

  return jsonRpcServer;
};
