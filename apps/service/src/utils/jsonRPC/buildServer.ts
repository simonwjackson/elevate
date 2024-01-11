import type { ServerParams } from "@elevate/utils/jsonRPC/webSockets/serverNode";
import { JSONRPCServer, TypedJSONRPCServer } from "json-rpc-2.0";
import { LinuxHostMethods } from "../../plugins/core";
import { pipe } from "fp-ts/lib/function";
import log from "@elevate/utils/logger";
import { buildFilter } from "objection-filter";
import Release from "@elevate/db/models/Release";
import Resource from "@elevate/db/models/Resource";
import db from "@elevate/db";

import { reduce } from "fp-ts/lib/Array";

export type MutateJsonRpcServer = (
  server: TypedJSONRPCServer<LinuxHostMethods, ServerParams>,
  context: PluginContext,
) => TypedJSONRPCServer<LinuxHostMethods, ServerParams>;

export type PluginContext = ReturnType<typeof buildContext>

const buildContext = () => ({
  log,
  buildFilter,
  data: {
    db,
    models: {
      Release,
      Resource,
    },
  },
});

const withContext =
  (fn: MutateJsonRpcServer) =>
  (server: TypedJSONRPCServer<LinuxHostMethods, ServerParams>) =>
    fn(server, buildContext());

const addPlugins =
  (plugins: MutateJsonRpcServer[]) =>
  (server: TypedJSONRPCServer<LinuxHostMethods, ServerParams>) =>
    pipe(
      plugins,
      reduce(server, (server, fn) => withContext(fn)(server)),
    );

export const buildJsonRpcServer = (plugins: MutateJsonRpcServer[]) =>
  pipe(new JSONRPCServer<ServerParams>(), addPlugins(plugins));
