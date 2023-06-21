const {Pokemon} = require('../db');

module.exports = async()=>{
    try {
        const dbPokemons = await Pokemon.findAll({
            attributes: ['id', 'name', 'image', 'life', 'attack', 'defense', 'type', 'speed', 'weight']
          });
        return dbPokemons
    } catch (error) {
       throw error;
    }

}