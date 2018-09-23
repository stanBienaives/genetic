const test = require('ava');
const Generation = require('../lib/generation');


test('Leaderboard should be ranked by higherfitness', function tester(t) {
  const fitness = (x) => x;
  const gen = Generation.create({fitness}, [1, 2, 3, 4]);

  t.deepEqual(gen.select(2), [4, 3]);
});

test('Leaderboard should be ranked by lower fitness if set', function tester(t) {
  const fitness = (x) => x;
  const optimize = (a,b) => a > b ? 1 : -1;

  const gen = Generation.create({
    fitness,
    optimize,
  }, [1, 2, 3, 4]);

  t.deepEqual(gen.select(2), [1, 2]);
});

test('Leaderboard should be ranked by lower fitness if set', function tester(t) {
  const fitness = (x) => x;
  const optimize = (a,b) => a > b ? 1 : -1;

  const gen = Generation.create({
    fitness,
    optimize,
  }, [1, 2, 3, 4]);

  t.deepEqual(gen.select(2), [1, 2]);
});