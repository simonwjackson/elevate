import { Model } from "objection";
// import Game from "./Game";

export default class Platform extends Model {
  code!: string;
  name?: string;
  created_at!: Date;
  updated_at?: Date;

  // games?: Game[];

  static get idColumn() {
    return "code";
  }

  static tableName = "platforms";

  // This object defines the relations to other models. The relationMappings
  // property can be a thunk to prevent circular dependencies.
  // static relationMappings = () => ({
  //   games: {
  //     relation: Model.HasManyRelation,
  //     modelClass: Game,
  //     join: {
  //       from: "platforms.code",
  //       to: "games.platform_code",
  //     },
  //   },
  // });
}
