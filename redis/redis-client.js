// redis-client.js
const redis = require('redis');
// const redis = require('redis');

const client = redis.createClient({
  host: '127.0.0.1', // If Redis is running locally, replace with your Redis host IP/hostname
  port: 6379, // Replace with your Redis port if different
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (err) => {
  console.error('Redis Error:', err);
});

module.exports = client;
