const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');
const createPokemon = require('../../src/controllers/createPokemon.js');



const agent = session(app);
const pokemon = {
  name: 'Pikachu',
  image: 'pikachu.png',
  life: 100,
  attack: 50,
  defense: 30,
  type: 'Electric',
  speed: 90,
  weight: 6.0,
  types: [8, 6],
};
describe('Pokemon routes', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err);
    })
  );
  beforeEach(() =>
    Pokemon.sync({ force: true }).then(() => {
    })
  );
  describe('GET /pokemons', () => {
    it('should get 200', () => agent.get('/pokemons').expect(200));
  });

  describe('POST /pokemons', () => {
    it('should create a new Pokemon', async () => {
      const res = await agent.post('/pokemons').send({
        name: 'Pikachu',
        image: 'pikachu.png',
        life: 100,
        attack: 50,
        defense: 30,
        types: [8, 6],
        speed: 90,
        weight: 6.0,
      });

      expect(res.status).to.equal(200)
    });
  });
});
