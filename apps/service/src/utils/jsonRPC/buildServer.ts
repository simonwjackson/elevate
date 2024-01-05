import type { ServerParams } from "../../../../../libs/utils/jsonRPC/webSockets/serverNode";
import {
  JSONRPCServer,
  JSONRPCServerMiddleware,
  TypedJSONRPCServer,
} from "json-rpc-2.0";
import { LinuxHostMethods, launch } from "../misc";
import { buildFilter } from "objection-filter";
import Release from "@elevate/db/models/Release";
import { strictGameScanner } from "../fileScanner";
import { getClient } from "./misc";

export const buildJsonRpcServer = () => {
  const jsonRpcServer: TypedJSONRPCServer<LinuxHostMethods, ServerParams> =
    new JSONRPCServer();

  const logMiddleware: JSONRPCServerMiddleware<ServerParams> = async (
    next,
    request,
    serverParams,
  ) => {
    console.log(`Received ${JSON.stringify(request)}`);

    return next(request, serverParams).then((response) => {
      console.log(`Responding ${JSON.stringify(response)}`);
      return response;
    });
  };

  jsonRpcServer.applyMiddleware(logMiddleware);

  jsonRpcServer.addMethod("scanReleases", () => {
    // HACK: Hardcoded
    const root = "/glacier/snowscape/gaming/games";

    strictGameScanner(root);
    return "ok";
  });

  jsonRpcServer.addMethod(
    "getAllReleases",
    // @ts-ignore
    async (obj: any) =>
      buildFilter<Release, typeof Release>(Release)
        .build(obj)
        .whereExists(Release.relatedQuery("resources"))
        .withGraphFetched("resources")
        .withGraphFetched("platform")
        .debug()
        .catch(console.error),
  );

  jsonRpcServer.addMethod("launch", (clientParams, serverParams) =>
    launch({
      onStart: console.log,
      onStop: (pid) => {
        getClient(serverParams)?.notify("echo", {
          message: `App closed: ${pid}`,
        });
      },
    })(clientParams),
  );

  // jsonRpc.addMethod("resolution/set", ({ x, y }) =>
  //   setResolution(state.monitor, x, y),
  // );

  return jsonRpcServer;
};
