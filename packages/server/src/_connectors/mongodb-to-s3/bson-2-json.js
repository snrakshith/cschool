// Here is a little node script that I write to dump all collections in a specific database to the specified output directory...

const MongoClient = require("mongodb").MongoClient;
const { spawn } = require("child_process");
const fs = require("fs");
const { timestamp } = require("./batchUtils");

const DB_URI = "mongodb://127.0.0.1:27017/";
const DB_NAME = "streamdb";
const OUTPUT_DIR = `mongodump_${timestamp}`; //'output-directory';
const client = new MongoClient(DB_URI);

async function runConvertor() {
  try {
    await client.connect();

    const db = client.db(DB_NAME);
    const collections = await db.collections();

    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }

    collections.forEach(async (c) => {
      const name = c.collectionName;
      await spawn("mongoexport", [
        "--db",
        DB_NAME,
        "--collection",
        name,
        "--jsonArray",
        "--pretty",
        `--out=./${OUTPUT_DIR}/${name}.json`,
      ]);
    });
  } finally {
    await client.close();
    console.log(`DB Data for ${DB_NAME} has been written to ./${OUTPUT_DIR}/`);
  }
}
// run().catch(console.dir);
module.exports = runConvertor().catch(console.dir);
