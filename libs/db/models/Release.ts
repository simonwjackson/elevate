import { Model } from "objection";
import Platform from "./Platform";
import Resource from "./Resource";

export default class Release extends Model {
  id!: number;
  name!: string;
  version?: string;
  release_date?: string;
  created_at!: Date;
  updated_at?: Date;

  platform!: Platform;
  resources!: Resource[];

  static tableName = "releases";

  static relationMappings = () => {
    return {
      platform: {
        relation: Model.BelongsToOneRelation,
        modelClass: Platform,
        join: {
          from: "releases.platform_code",
          to: "platforms.code",
        },
      },
      resources: {
        relation: Model.ManyToManyRelation,
        modelClass: Resource,
        join: {
          from: "releases.id",
          through: {
            from: "release_resource.release_id",
            to: "release_resource.resource_id",
          },
          to: "resources.id",
        },
      },
    };
  };
}
