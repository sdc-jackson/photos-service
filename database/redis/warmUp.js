const models = require('../../server/models');

const warmUp = async () => {
  try {
    console.log('running redis cache warm up');
    for (let i = 9000000; i <= 9333333; i++) {
      console.log(i);
      await models.read(i);
    }
  } catch (err) {
    console.log(err);
  }
}

warmUp();