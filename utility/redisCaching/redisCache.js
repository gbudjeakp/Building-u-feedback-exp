const redis = require("redis");
require("dotenv").config();

//establishes redis connection

let clientInfo;
//determines url to establish cache connection with depending on whether in prod or dev
process.env.NODE_ENV === "development"
  ? (clientInfo = `redis://${process.env.REDIS_DEV_HOST}:${Number(
      process.env.REDIS_DEV_PORT
    )}`)
  : (clientInfo = `redis://${process.env.REDIS_PROD_HOST}:${Number(
      process.env.REDIS_PROD_PORT
    )}`);

//for debugging
console.log(clientInfo);

//basic code to be called at the beginning to establish connection
const redisClient = redis.createClient({ url: clientInfo });
redisClient.on("connect", () => {
  console.log("Connected to Redis");
});
redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});
//ensures same client can be used across multiple endpoints
module.exports = redisClient;
// await client.connect();
// let response = await client.ping();
// console.log("Ping response:", response);
// await client.SETEX("john", 20, "doe");
// await client.quit();
