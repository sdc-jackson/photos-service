const redis = require('redis');
const dotenv = require('dotenv').config()
const REDIS_PORT = process.env.REDIS_PORT || 6379
const models = require('../../server/models');

const redisClient = redis.createClient(REDIS_PORT);
redisClient.on('connect', () => console.log('Connected to Redis'));
redisClient.on('error', (error) => console.error(error, 'Redis connection error'));

// Redis middleware
const cache = (req, res, next) => {
  const roomNumber = req.params.id;
  redisClient.get(roomNumber, async (err, reply) => {
    try {
      if (err) throw err;
      if (reply !== null) {
        const data = await JSON.parse(reply);
        res.status(200).send(data)
      } else {
        next();
      }
    } catch (e) {
      console.log(e);
      next();
    }
  });
}

module.exports.redisClient = redisClient;
module.exports.cache = cache