import { createBunServer } from "./utils/index.js";

const host = createBunServer();

console.log(`Listening on http://localhost:${host.httpWebSocket.port} ...`);

// setTimeout(() => {
//   console.log("ready");
//   if (host.peers?.entries()?.next()?.value[0]) {
//     console.log("found first client");
//
//     host.peers
//       .entries()
//       .next()
//       .value[1].client.timeout(10 * 1000, () => {})
//       .request("echo", { message: "from host to frontend" })
//       .then(console.log);
//   }
// }, 10000);
