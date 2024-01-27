import Ajv from "ajv";

const ajv = new Ajv();

// if (process.env.NODE_ENV !== "production") {
//   ajv.addKeyword({
//     type: "object",
//     keyword: "isFunction",
//     validate: function (schema: any, data: any) {
//       return typeof data === "function";
//     },
//     errors: false,
//   });
// }

export default ajv