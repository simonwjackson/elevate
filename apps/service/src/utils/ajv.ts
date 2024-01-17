import Ajv from "ajv";

const ajv = new Ajv();

ajv.addKeyword({
  // type: "object",
  keyword: "isFunction",
  validate: function (schema: any, data: any) {
    return typeof data === "function";
  },
  errors: false,
});

export default ajv