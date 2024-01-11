export type BasicEcho = { message: string };

export type NodeMethods = {
  "@elevate/core/releases/scan/complete"(): void;
  echo(params: BasicEcho): string;
};
