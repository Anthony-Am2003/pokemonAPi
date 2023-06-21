const { Favorites } = require('../db');

const addFavorite = async (pokemonData) => {
  let { id, name, attack, image, type } = pokemonData;
  if (!name || !attack || !image) {
    throw new Error('Faltan datos');
  }

  await Favorites.findOrCreate({ where: { id: id.toString(), name, attack, image, type } });
  const allFavorites = await Favorites.findAll();

  return allFavorites;
};

module.exports = {
  addFavorite,
};