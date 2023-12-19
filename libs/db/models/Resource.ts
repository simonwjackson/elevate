import { Model } from "objection";
import Release from "./Release";

export default class Resource extends Model {
  uri!: string;
  md5?: string;
  created_at!: Date;
  updated_at?: Date;

  releases!: Release[];

  static get idColumn() {
    return "uri";
  }

  static tableName = "resources";

  static relationMappings = () => ({
    releases: {
      relation: Model.ManyToManyRelation,
      modelClass: Release,
      join: {
        from: "resources.uri",
        through: {
          from: "resource_release.resource_uri",
          to: "resource_release.release_id",
        },
        to: "releases.id",
      },
    },
  });
}
