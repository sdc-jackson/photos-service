const db = require('../postgres');
const { redisClient } = require('../redis');
const { Rooms, Photos } = require('../postgres/models');

const warmUp = async (params) => {
  const startTime = new Date().getTime();
  console.log('running redis cache warm up');
  await db.authenticate();

  while (params <= 9125000) {
    console.log(params)

    try {
      await Rooms.findAll({ where: {room_number: params}, include: [Photos] })
      .then((res) => JSON.stringify(res))
      .then(async (data) => {
        await redisClient.set(params, data);
        return data
      })
      .catch(err => err)

    } catch (e) {
      console.log(e)
    }

    params++;
  }

  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime);
  console.log(`Execution time: ${executionTime} ms`);
}

warmUp(9000000);