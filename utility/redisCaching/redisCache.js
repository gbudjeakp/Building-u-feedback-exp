const redis = require("redis");
require("dotenv").config();

let clientInfo;
process.env.NODE_ENV === "development"
  ? (clientInfo = `redis://${process.env.REDIS_DEV_HOST}:${Number(process.env.REDIS_DEV_PORT)}`)
  : (clientInfo = `redis://${process.env.REDIS_PROD_HOST}:${Number(process.env.REDIS_PROD_PORT)}`);

console.log(clientInfo);

const redisClient = redis.createClient({ url: clientInfo });

/* This initalizes our redis connection */
const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (err) {
    console.error("Redis connection error:", err);
  }
};

/*Incase there's some issues with the network, we wanna try to
make a reconnect instead of closing the connection or shutting it down */
redisClient.on("error", (err) => {
  console.error("Redis error:", err);
  redisClient.disconnect();
  setTimeout(connectRedis, 1000);
});

connectRedis();

// Saw this onlin,. it helps with shutting down the connection when the app
// is shutdown
process.on("SIGINT", () => {
  redisClient.quit(() => {
    console.log("Redis client disconnected");
    process.exit(0);
  });
});

module.exports = redisClient;
