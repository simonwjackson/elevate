import { createRxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { initialize } from '../../db/src'

const create = async () => {
  const db = await createRxDatabase({
    name: "qawsuaasxx",
    storage: getRxStorageDexie(),
    ignoreDuplicate: true,
  });

  await initialize(db)
  
  return db;
};

export default create;
