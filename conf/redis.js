const { createClient } = require("redis");

require('dotenv').config();

const client = createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

(async () => {
  await client.connect();
})();

client.on('connect', () => console.log('Redis connected!'));
client.on('error', (err) => console.log('Redis Client Error!', err));

module.exports = client;
