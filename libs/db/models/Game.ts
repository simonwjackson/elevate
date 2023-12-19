import { Model } from "objection";
import Platform from "./Platform";

export default class Game extends Model {
  fullPath!: string;
  platform_id!: number;
  created_at!: Date;
  updated_at?: Date;

  platform!: Platform;

  static get idColumn() {
    return "fullPath";
  }

  static tableName = "games";

  static relationMappings = {
    platform: {
      relation: Model.HasManyRelation,
      modelClass: Platform,
      join: {
        from: "games.platform_code",
        to: "platforms.code",
      },
    },
  };
}
