const axios = require('axios');

module.exports = async (name) => {
  try {
    if(!name) throw new Error('Enter a name to search')
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const response = await axios.get(pokemonUrl);
    const pokemonInfo = response.data;
    
    const pokemon = {
      id: pokemonInfo.id,
      name: pokemonInfo.name,
      image: pokemonInfo.sprites.other['dream_world'].front_default,
      types: pokemonInfo.types.map(({ type }) => {
        const id = Number.parseInt(type.url.slice(31));
        const { name } = type;
        return { id, name };
      }),
      life: pokemonInfo.stats.find((attribute) => attribute.stat.name === 'hp').base_stat,
      attack: pokemonInfo.stats.find((attribute) => attribute.stat.name === 'attack').base_stat,
      defense: pokemonInfo.stats.find((attribute) => attribute.stat.name === 'defense').base_stat,
    };
    return pokemon;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log(error.response)
      throw new Error('This pokemon not exist');
    }
    throw error;
  }
  };

