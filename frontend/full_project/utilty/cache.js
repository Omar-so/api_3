const connectRedis = require("../config/redis");

async function setCache(key, value, ttlInSeconds) {
  const client = await connectRedis();
  if (ttlInSeconds) {
    await client.setEx(key, ttlInSeconds, JSON.stringify(value));
  } else {
    await client.set(key, JSON.stringify(value));
  }
}

async function getCache(key) {
  const client = await connectRedis();
  const data = await client.get(key);
  return data ? JSON.parse(data) : null;
}

async function incrCache(key, expireSeconds) {
  const client = await connectRedis();
  const value = await client.incr(key);
  if (expireSeconds) {
    await client.expire(key, expireSeconds);
  }
  return value;
}

module.exports = { setCache, getCache, incrCache };
