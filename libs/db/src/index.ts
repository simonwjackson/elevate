import { addRxPlugin } from "rxdb";
import { RxDBQueryBuilderPlugin } from "rxdb/plugins/query-builder";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";

import { users, releases } from "./data";

addRxPlugin(RxDBDevModePlugin);
addRxPlugin(RxDBQueryBuilderPlugin);

export const initialize = async (db) => {
  // create a collection
  const collection = await db.addCollections({
    releases: {
      statics: {
        pinnedBy(user, hosts) {
          return this.find({
            selector: {
              id: {
                $in: user.pins.releases,
              },
              resources: {
                $elemMatch: {
                  host: {
                    $in: hosts,
                  },
                },
              },
            },
          });
        },
      },
      schema: {
        title: "releases",
        version: 0,
        type: "object",
        primaryKey: "id",
        properties: {
          id: {
            type: "string",
            maxLength: 250,
          },
          platform: {
            type: "string",
          },
          created_at: {
            type: "string",
            format: "date-time",
          },
          updated_at: {
            type: "string",
            format: "date-time",
          },
          version: {
            type: ["string", "null"],
          },
          release_date: {
            type: ["string", "null"],
            format: "date-time",
          },
          name: {
            type: "string",
          },
          media: {
            type: "object",
            properties: {
              posters: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              grids: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              logos: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              heroes: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              icons: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
          },
          resources: {
            type: "array",
            items: {
              type: "object",
              properties: {
                host: {
                  type: "string",
                },
                location: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
    users: {
      statics: {
        getDefaultUser() {
          return this.findOne({
            selector: {
              name: "Default User",
            },
          });
        },
      },
      schema: {
        title: "user",
        version: 0,
        type: "object",
        primaryKey: "id",
        properties: {
          id: {
            type: "string",
            maxLength: 250,
          },
          name: {
            type: "string",
          },
          pins: {
            type: "object",
            properties: {
              releases: {
                type: "array",
                ref: "releases",
                items: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  });

  collection.users.bulkInsert(users);
  collection.releases.bulkInsert(releases);

  return db;
};

export default initialize;
