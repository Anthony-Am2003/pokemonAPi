const { Pokemon } = require('../db');
const axios = require('axios');

const getPokemonById = async (id) => {
  if (id.length > 5) {
    const dbPokemon = await Pokemon.findOne({ where: { id } });
   const pokemon = {
    id: dbPokemon.id,
    name: dbPokemon.name,
    image: dbPokemon.image,
    life: dbPokemon.life,
    speed: dbPokemon.speed,
    weight: dbPokemon.weight,
    attack: dbPokemon.attack,
    defense: dbPokemon.defense,
    types: dbPokemon.type,
  };
    return pokemon;
  }

  const pokemonUrl = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemonInfo = pokemonUrl.data;
  const pokemon = {
    id: pokemonInfo.id,
    name: pokemonInfo.name,
    image: pokemonInfo.sprites.other['official-artwork'].front_default,
    types: pokemonInfo.types.map(({ type }) => type.name),
    life: pokemonInfo.stats.find((attribute) => attribute.stat.name === 'hp').base_stat,
    attack: pokemonInfo.stats.find((attribute) => attribute.stat.name === 'attack').base_stat,
    defense: pokemonInfo.stats.find((attribute) => attribute.stat.name === 'defense').base_stat,
    speed: pokemonInfo.stats.find((attribute) => attribute.stat.name === 'speed').base_stat,
    weight: pokemonInfo.weight,
  };
  return pokemon
};

module.exports = {
  getPokemonById,
};