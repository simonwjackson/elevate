import { Model } from "objection";
import Release from "./Release";
import Platform from "./Platform";

export default class Resource extends Model {
  id!: string;
  uri!: string;
  md5?: string;
  created_at!: Date;
  updated_at?: Date;

  releases!: Release[];
  platform?: Platform;

  static get idColumn() {
    return "uri";
  }

  static tableName = "resources";

  static relationMappings = () => ({
    platform: {
      relation: Model.HasOneThroughRelation,
      modelClass: Platform,
      join: {
        from: "resources.id",
        through: {
          from: "platform_resource.resource_id",
          to: "platform_resource.platform_code",
        },
        to: "platforms.code",
      },
    },
    // releases: {
    //   relation: Model.ManyToManyRelation,
    //   modelClass: Release,
    //   join: {
    //     from: "resources.uri",
    //     through: {
    //       from: "resource_release.resource_uri",
    //       to: "resource_release.release_id",
    //     },
    //     to: "releases.id",
    //   },
    // },
  });
}
