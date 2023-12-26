// // INFO: This works, but existance must be known to the consumer
// // changing it to `query` breaks upsert
// static $query<M extends Model = Resource>(
//   trxOrKnex?: TransactionOrKnex,
// ): QueryBuilderType<M> {
//   return super
//     .query(trxOrKnex)
//     .where("created_at", "<", new Date("2020-10-01"));
// }
import Objection, { Model } from "objection";
import { knex } from "knex";
// @ts-ignore
import config from "./knexfile";
import Resource from "./models/Resource";
const knexInstance = knex(config.development);

Model.knex(knexInstance);

export default Model;

// const options = {
//   update: true,
//   noUpdate: true,
//   insertMissing: true,
//   relate: true,
// } as Objection.UpsertGraphOptions;
//
// async function main() {
//   try {
//     await Model.transaction(async (trx) => {
//       //       await Resource.query(trx).clearWhere().upsertGraph(
//       //         {
//       //           uri: "/a/b/c.rom",
//       //         },
//       //         options,
//       //       );
//       //
//       //       await Resource.query(trx).clearWhere().upsertGraph(
//       //         {
//       //           uri: "/a/b/c.rom",
//       //         },
//       //         options,
//       //       );
//       //
//       //       const res1 = await Resource.query(trx)
//       //         .clearWhere()
//       //         .upsertGraphAndFetch(
//       //           {
//       //             uri: "/a/b/c.rom",
//       //             md5: "123",
//       //             platform: {
//       //               code: "nintendo-wii",
//       //               name: "Nintendo Wii",
//       //             },
//       //           },
//       //           {
//       //             ...options,
//       //           },
//       //         );
//       //
//       //       console.log(res1);
//       const res_ = await Resource.query(trx).upsertGraphAndFetch(
//         {
//           // NOTE: if we want to upsert and relate from a non primary key, we must explicitly provide an ID
//           id: Math.random() + "",
//           uri: "/a/b/c.rom",
//           md5: "124",
//           platform: {
//             code: "nintendo-wii",
//             name: "Nintendo Wii",
//           },
//         },
//         {
//           ...options,
//         },
//       );
//       // .debug();
//       console.log(res_);
//
//       const res = await Resource.query(trx).upsertGraphAndFetch(
//         {
//           id: Math.random() + "",
//           uri: "/a/b/c.rom",
//           md5: "666",
//           platform: {
//             code: "nintendo-wii",
//             name: "Nintendo Wii",
//           },
//         },
//         {
//           ...options,
//         },
//       );
//       // .debug();
//
//       console.log(res);
//       //
//       // const res3 = await Resource.query(trx).findOne({ uri: "/a/b/c.rom" });
//       // const res4 = await res3?.$fetchGraph("*");
//       // // .where({ created_at: "2023" })
//       //
//       // console.log(res4);
//     });
//   } catch (err) {
//     console.log(err);
//   }
//
//   // Fetch all people named Sylvester and sort them by id.
//   // Load `children` relation eagerly.
//   // const result = await Game.query().whereNot("fullPath", "=", "");
//   // const result = await Platform.query().where("name", "like", "%nintendo%");
//   // console.log("result:", result);
// }
//
// main().then(() => process.exit(0));
