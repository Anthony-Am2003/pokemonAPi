const { Router } = require("express");
const {getAllPokemons} = require("../controllers/getAllPokemons");
const {getPokemonById} = require("../controllers/getPokemonById");
const getPokemonByName = require("../controllers/getPokemonByName");
const {getTypes} = require('../controllers/getTypes');
const {createPokemon} = require('../controllers/createPokemon');
const {addFavorite} = require('../controllers/postFavorite')
const {removeFavorite} = require('../controllers/deleteFavorite')
const getPokemonsBD = require("../controllers/getPokemonsBD");

const router = Router();


router.get("/pokemons", async (req, res) => {
    try {
      const pokemons = await getAllPokemons();
      res.status(200).json(pokemons);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

 router.get('/pokemonsid/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const pokemon = await getPokemonById(id);
      res.status(200).json(pokemon);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

router.get("/pokemon", async(req, res) =>{
    try {
        const { name } = req.query;
        const pokemon = await getPokemonByName(name);
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post("/pokemons", async (req, res) => {
    try {
        const pokemonData = req.body
      const createdPokemon = await createPokemon(pokemonData);
      res.status(200).json(createdPokemon);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

router.get('/types',async (req, res) => {
    try {
      const types = await getTypes();
      res.status(200).json(types);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

router.post('/fav', async (req, res) => {
    try {
      const allFavorites = await addFavorite(req.body);
      res.json(allFavorites);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

router.delete('/fav/:id',  async (req, res) => {
    try {
      const { id } = req.params;
      const allFavorites = await removeFavorite(id);
      res.json(allFavorites);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

router.get('/pokemon/db', async(req, res) =>{
    try {
        const pokemonDB = await getPokemonsBD();
        res.status(200).json(pokemonDB);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router;
