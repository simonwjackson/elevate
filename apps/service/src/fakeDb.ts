export type _Game = {
  title: string;
};

export type SteamGame = {
  platform: "steam";
  meta?: {
    steamAppId?: number;
  };
} & _Game;

export type RetrorchGame = {
  platform:
    | "nintendo-entertainment-system"
    | "nintendo-super-entertainment-system";
} & _Game;

export type Game = SteamGame | RetrorchGame;

export const gameDb: Record<string, Game> = {
  fsd8j: {
    platform: "steam",
    title: "Rouge Legacy 2",
    meta: {
      steamAppId: 1253920,
    },
  },
};
