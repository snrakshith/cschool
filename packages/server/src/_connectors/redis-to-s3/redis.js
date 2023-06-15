const Redis = require("ioredis");

const redis = new Redis({
  // host: "172.17.0.2", // Redis server host
  host: "127.0.0.1", // Redis server host
  port: 6379, // Redis server port
});

// Store data in Redis
const storeDataInRedis = async (data) => {
  console.log("Redis data:", data);
  await redis.set("tutorialspedia", data);
};

// Get data from Redis
const getDataFromRedis = async (key = "tutorialspedia") => {
  // ioredis supports the node.js callback style
  await redis.get(key, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log(result); // Prints "value"
    }
  });
};

module.exports = storeDataInRedis;
module.exports = getDataFromRedis;
