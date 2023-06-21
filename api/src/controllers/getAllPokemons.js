const { Pokemon, Type, conn, Pokemon_Type } = require('../db');
const axios = require('axios');
const { Op } = require('sequelize');

const getAllPokemons = async () => {
  try {
    const forPage = 60;

    const pokemonsUrl = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${forPage}`);
    const results = pokemonsUrl.data.results;
    const pokemonCompletes = await Promise.all(results.map(pokemon => axios.get(pokemon.url)));

    const allPokemonsApi = pokemonCompletes.map((response) => {
      const { id, name, sprites, types, stats } = response.data;
      const image = sprites.other["dream_world"].front_default;
      const pokemonTypes = types.map(typeData => typeData.type.name);
      const attack = stats[1].base_stat;
      return { id, name, image, type: pokemonTypes, attack };
    });

    return allPokemonsApi;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllPokemons,
};