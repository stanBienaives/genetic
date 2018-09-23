const test = require('ava');
const GeneticTournament = require('../lib/genetic');


const config = {
  seed   : () => [...Array(20).keys()].map(() => Math.random()),
  fitness: (entity) => entity.reduce((sum, occ) => sum + occ, 0),
  config : {
    size      : 200,
    crossover : 0.2,
    mutation  : 0.2,
    iterations: 100,
    survivals : 1,
  },
};


test('Default params should work and return entity should be very close to an Array of one', function tester(t) {
  const tournament = new GeneticTournament(config);

  tournament.evolve();

  const {best} = tournament;
  const footprint = best.reduce((sum, occ) => sum + parseFloat(occ), 0);

  t.true((best.length - footprint) / best.length < 0.05);

});

test('Optimize function should reverse result', function tester(t) {
  const config2 = Object.assign(config, {
    optimize: (fit1, fit2) => {
      return fit1 > fit2 ? 1 : -1;
    },
  });

  const tournament = new GeneticTournament(config2);

  tournament.evolve();

  const {best} = tournament;
  const footprint = best.reduce((sum, occ) => sum + parseFloat(occ), 0);

  t.true((best.length - footprint) / best.length > 0.95);

});

test('Optimize function should reverse result', function tester(t) {
  const config2 = Object.assign(config, {
    optimize: (fit1, fit2) => {
      return fit1 > fit2 ? 1 : -1;
    },
  });

  config2.config.size = 2;

  const tournament = new GeneticTournament(config2);

  tournament.evolve();

  const {best} = tournament;
  const footprint = best.reduce((sum, occ) => sum + parseFloat(occ), 0);

  t.true((best.length - footprint) / best.length > 0.5);

});