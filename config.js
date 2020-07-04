require('dotenv').config();

const config = {
  port: 5000,
  dbUrlMongoDB: process.env.dbUrlMongoDB,
  URL_PLACES_API: process.env.URL_PLACES_API,
  API_KEY: process.env.API_KEY,
  keysPlaces: process.env.keysPlaces.split(',') || [],
  API_KEY_JWT: process.env.API_KEY_JWT,
  TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN,
};

module.exports = config;
