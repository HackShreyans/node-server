// redis-client.js
const redis = require('redis');

function createRedisClient() {
  const client = redis.createClient();

  client.on('error', (error) => console.error(`Error: ${error}`));
  client.on('connect', () => console.log('Redis connected'));

  return client;
}

module.exports = createRedisClient;
