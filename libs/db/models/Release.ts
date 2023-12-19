import { Model } from "objection";
import Platform from "./Platform";

export default class Release extends Model {
  id!: number;
  name!: string;
  version?: string;
  release_date?: string;
  created_at!: Date;
  updated_at?: Date;

  platform!: Platform;

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
      // files: {
      //   relation: Model.ManyToManyRelation,
      //   modelClass: File,
      //   join: {
      //     from: "releases.id",
      //     through: {
      //       from: "file_release.release_id",
      //       to: "file_release.file_uri",
      //     },
      //     to: "files.file_uri",
      //   },
      // },
    };
  };
}
