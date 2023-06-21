const axios = require('axios');
const { Type } = require('../db');

const getTypes = async () => {
  const typesFromDB = await Type.findAll();
  if (typesFromDB.length > 0) {
    return typesFromDB;
  }

  const response = await axios.get('https://pokeapi.co/api/v2/type');
  const typesFromAPI = response.data.results;

  const createdTypes = await Promise.all(
    typesFromAPI.map(async (type) => {
      return Type.create({
        name: type.name,
        id: Number.parseInt(type.url.slice(31)),
      });
    })
  );

  return createdTypes;
};

module.exports = {
  getTypes,
};