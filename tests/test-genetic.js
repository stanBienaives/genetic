const test = require('ava');
const GeneticTournament = require('../lib/genetic');


const tournament = new GeneticTournament({
  seed: () => [...Array(20).keys()].map(() => Math.random()),
  optimize: (a,b) => a > b,
  fitness: (entity) => entity.reduce((sum, occ) => sum + occ, 0),
  config: {
    size: 200,
    crossover: 0.2,
    mutation: 0.2,
    iterations: 100,
    survivals: 1,
  }
});

tournament.evolve();

test('Best entity should be very close to an Array of one', function test(t) {
  const best = tournament.best;
  const footprint =  best.reduce((sum, occ) => sum + parseFloat(occ), 0); 
  t.true( (best.length  - footprint) / best.length < 0.01 )

    // notification,
})



// })
