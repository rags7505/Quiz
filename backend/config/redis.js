const { createClient } = require('redis');
const redisClient = createClient();

redisClient.on('error', err => console.error('Redis Error:', err));

const connectRedis = async () => {
  await redisClient.connect();
  console.log('Redis connected');
};

module.exports = redisClient;
module.exports.connectRedis = connectRedis;
