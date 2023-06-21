const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));

    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });

      it('should work when it is a valid name', () => {
        Pokemon.create({ name: 'Pikachu' });
      });
    });

    describe('image', () => {
      it('should throw an error if image is null', (done) => {
        const Pokemon = conn.models.Pokemon;

        Pokemon.create({ name: 'Pikachu' })
          .then(() => done(new Error('It requires a valid image')))
          .catch((error) => {
            expect(error.name).to.equal('SequelizeValidationError');
            done();
          });
      });

      it('should work when it is a valid image', () => {
        const Pokemon = conn.models.Pokemon;

        Pokemon.create({ name: 'Pikachu', image: 'pikachu.png' });
      });
    });

    describe('life', () => {
      it('should throw an error if life is null', (done) => {
        const Pokemon = conn.models.Pokemon;

        Pokemon.create({ name: 'Pikachu', image: 'pikachu.png' })
          .then(() => done(new Error('It requires a valid life')))
          .catch((error) => {
            expect(error.name).to.equal('SequelizeValidationError');
            done();
          });
      });

      it('should work when it is a valid life', () => {
        const Pokemon = conn.models.Pokemon;

        Pokemon.create({ name: 'Pikachu', image: 'pikachu.png', life: 100 });
      });
    });

    describe('attack', () => {
      it('should throw an error if attack is null', (done) => {
        const Pokemon = conn.models.Pokemon;

        Pokemon.create({ name: 'Charizard', image: 'charizar.img', life: 80 })
          .then(() => done(new Error('It requires a valid attack')))
          .catch((error) => {
            expect(error.name).to.equal('SequelizeValidationError');
            done();
          });
      });

      it('should throw an error if attack is a string', (done) => {
        const Pokemon = conn.models.Pokemon;

        Pokemon.create({ name: 'Pikachu', image: 'pikachu.png', life: 100, attack: '90' })
          .then(() => done(new Error('attack should be a Number')))
          .catch((error) => {
            expect(error.name).to.equal('SequelizeValidationError');
            done();
          });
      });

      it('should throw an error if attack is greater than 300', (done) => {
        const Pokemon = conn.models.Pokemon;
      
        Pokemon.create({ name: 'Pikachu', image: 'pikachu.png', life: 100, attack: 490 })
          .then(() => done(new Error('attack cannot exceed 300')))
          .catch((error) => {
            expect(error.name).to.equal('SequelizeValidationError');
            done();
          });
      });

      it('should work when it is a valid attack', () => {
        const Pokemon = conn.models.Pokemon;

        Pokemon.create({ name: 'Pikachu', image: 'pikachu.png', life: 100, attack: 90 });
      });
    });
  });
});