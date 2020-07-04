/* eslint-disable consistent-return */
const axios = require('axios');
const moment = require('moment-timezone');

const schemes = require('../models/mongoose');
const config = require('../../../config');

const getKeys = (placesArray, keysToGet) => {
  const places = [];
  placesArray.forEach((place) => {
    const data = {};
    keysToGet.forEach((key) => {
      data[key] = place[key];
    });
    places.push(data);
  });
  return places;
};

const getFilteredPlacesWithKeys = (placesArray, type) => {
  const reqPlaces = placesArray.filter((x) => x.types.includes(type));
  const places = getKeys(reqPlaces, config.keysPlaces);
  return places;
};

module.exports.findPlaces = async (res, parameters, requestInfo, userInfo) => {
  const { lat, lng, type, radius } = parameters;
  try {
    const response = await axios.get(`${config.URL_PLACES_API}`, {
      params: { location: `${lat},${lng}`, key: config.API_KEY, radius },
    });

    const places = getFilteredPlacesWithKeys(response.data.results, type);

    const loggingTransaction = new schemes.Transaction({
      ...requestInfo,
      ...parameters,
      ...{
        response: places,
        time: Number(moment.tz('America/Bogota')),
        userId: userInfo.id,
      },
    });

    loggingTransaction.save((err) => {
      if (err) {
        return res
          .status(500)
          .send({ message: 'Internal Server Error', data: [] });
      }
      return res.status(200).send({
        data: places,
        message: places.length > 0 ? 'Places found' : 'No places found',
      });
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', data: [] });
  }
};

module.exports.listTransactions = async (res) => {
  schemes.Transaction.find({}, (err, messages) => {
    if (err)
      return res.status(500).json({ error: 'Internal Server Error', data: [] });
    return res.status(200).json({ message: 'Transactions', data: messages });
  });
};
