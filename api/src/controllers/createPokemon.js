const { Pokemon, Type } = require('../db');
const { Op } = require('sequelize');

const createPokemon = async (pokemonData) => {
  const { name, image, life, attack, defense, types, speed, weight } = pokemonData;

  if (!name || !image || !life || !attack || !defense || !types || !speed || !weight) {
    throw new Error('Falta información');
  }

  const parsedSpeed = Number.parseInt(speed);
  const parsedWeight = Number.parseInt(weight);
  const parsedLife = Number.parseInt(life);
  const parsedAttack = Number.parseInt(attack);
  const parsedDefense = Number.parseInt(defense);
  const createdTypes = await Type.findAll({
    where: {
      id: { [Op.or]: types },
    },
  });
  const type = createdTypes.map((type) => type.dataValues.name);

  const pokemon = await Pokemon.create({
    name: name,
    image: image,
    life: parsedLife,
    attack: parsedAttack,
    defense: parsedDefense,
    speed: parsedSpeed,
    type: type,
    weight: parsedWeight,
  });

  await pokemon.addTypes(createdTypes);

  return pokemon;
};

module.exports = {
  createPokemon,
};