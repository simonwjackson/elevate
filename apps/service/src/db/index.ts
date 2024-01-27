import { addRxPlugin, createRxDatabase } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import {
    getRxStorageLoki
} from 'rxdb/plugins/storage-lokijs';
import {initialize} from '../../../../libs/db/src'

const adapter = require("lokijs/src/loki-fs-sync-adapter");

export async function createDb() {
  if (process.env.NODE_ENV !== "production") {
      addRxPlugin(RxDBDevModePlugin);
      await import('rxdb/plugins/dev-mode').then(
          module => addRxPlugin(module.RxDBDevModePlugin)
      );
  }

 const db = await createRxDatabase({
    name: "qawsuaasxx",
    storage: getRxStorageLoki({
      adapter: new adapter(),
      /*
       * Do not set lokiJS persistence options like autoload and autosave,
       * RxDB will pick proper defaults based on the given adapter
       */
    }),

    ignoreDuplicate: true,
  });

  await initialize(db)

  return db
} 