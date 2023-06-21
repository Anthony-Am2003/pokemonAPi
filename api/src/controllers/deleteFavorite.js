const { Favorites } = require('../db');

const removeFavorite = async (id) => {
  await Favorites.destroy({ where: { id } });
  const allFavorites = await Favorites.findAll();
  return allFavorites;
};

module.exports = {
  removeFavorite,
};