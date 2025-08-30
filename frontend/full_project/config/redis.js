const { createClient } = require("redis");
const dot = require("dotenv");
dot.config();

let client;

async function connectRedis() {
  if (!client) {
    if (process.env.ENV === "PRODUCTION") {
      client = createClient({
        url: process.env.UPSTASH_REDIS_URL,
      });
    } else {
      client = createClient({
        url: `redis://${process.env.REDIS_HOST || "redis"}:6379`,
      });
    }

    client.on("error", (err) => console.error("Redis Client Error:", err));
    client.on("ready", () => console.log("Redis Client Ready"));

    await client.connect();
  }
  return client;
}

module.exports = connectRedis;
