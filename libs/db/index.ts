import { Model } from "objection";
import { knex } from "knex";
// @ts-ignore
import config from "./knexfile";
import Resource from "./models/Resource";
const knexInstance = knex(config.development);

Model.knex(knexInstance);

async function firstFn() {
  const res = await knexInstance.schema.hasTable("users");
  console.log(res);
}

async function main() {
  try {
    await Model.transaction(async (trx) => {
      await Resource.query(trx).upsertGraph(
        [
          {
            uri: "/a/b/c.rom",
          },
        ],
        {
          update: true,
          insertMissing: true,
          relate: true,
        },
      );

      await Resource.query(trx).upsertGraph(
        {
          uri: "/a/b/c.rom",
        },
        {
          update: true,
          insertMissing: true,
          relate: true,
        },
      );

      const res = await Resource.query(trx).upsertGraphAndFetch(
        {
          uri: "/a/b/c.rom",
          md5: "123",
          releases: [
            {
              name: "C",
              version: "1",
              platform: {
                code: "nintendo-wii",
                name: "Nintendo Wii",
              },
            },
          ],
        },
        {
          update: true,
          insertMissing: true,
          relate: true,
        },
      );

      console.log(res);
    });
  } catch (err) {
    console.log(err);
  }

  // Fetch all people named Sylvester and sort them by id.
  // Load `children` relation eagerly.
  // const result = await Game.query().whereNot("fullPath", "=", "");
  // const result = await Platform.query().where("name", "like", "%nintendo%");
  // console.log("result:", result);
}

firstFn().then(main);
