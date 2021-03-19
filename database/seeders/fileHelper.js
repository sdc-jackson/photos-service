const path = require('path');
const fs = require('fs');
const axios = require('axios');
const loremPicsum = require('lorem-picsum');

const getRandomImage = async () => {
  let imageURL = loremPicsum({
    width: 720
  });

  var imageStream = await axios({
    url: imageURL,
    method: 'GET',
    responseType: 'stream'
  });
  return imageStream;
}

module.exports = {
  getRandomImage
}


