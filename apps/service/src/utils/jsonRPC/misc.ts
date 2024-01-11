import type { ServerParams } from "@elevate/utils/jsonRPC/webSockets/serverNode";

export const getClient = (params: ServerParams) => params.peers.get?.(params.clientId)?.client;