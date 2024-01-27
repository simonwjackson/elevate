import type { ServerParams } from "@elevate/utils/jsonRPC/webSockets/serverNode";
import { JSONRPCServer, TypedJSONRPCServer } from "json-rpc-2.0";
import { LinuxHostMethods } from "../../plugins/core";
import { pipe } from "fp-ts/lib/function";
import log from "@elevate/utils/logger";
import { LauncherAddon } from "../plugins/addLauncher";

import { reduce } from "fp-ts/lib/Array";
import { ElevateContext } from "../..";

export type MutateJsonRpcServer = (
  server: TypedJSONRPCServer<LinuxHostMethods, ServerParams>,
  context: ElevateContext,
) => TypedJSONRPCServer<LinuxHostMethods, ServerParams>;

// export type PluginContext = ReturnType<typeof buildContext>

// const buildContext = () => ({
//   log,
//   launchers: {} as Record<string, LauncherAddon>
// });

// const withContext =
//   (fn: MutateJsonRpcServer) =>
//   (server: TypedJSONRPCServer<LinuxHostMethods, ServerParams>) =>
//     fn(server, buildContext());

const addPlugins =
  (context: ElevateContext, plugins: MutateJsonRpcServer[]) =>
  (server: TypedJSONRPCServer<LinuxHostMethods, ServerParams>) =>
    pipe(
      plugins,
      reduce(server, (server, fn) => fn(server, context)),
    );

export const buildJsonRpcServer = (context: ElevateContext, plugins: MutateJsonRpcServer[]) =>
  pipe(new JSONRPCServer<ServerParams>(), addPlugins(context, plugins));
