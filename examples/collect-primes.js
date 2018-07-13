

const seed = () => {
  return Array.from(new Array(50), () => Math.floor(Math.random() * 10000));
};

const isPrime = (num) => {
  for (let int = 2; int < num; int += 1) {
    if (num % int === 0)
      return false;
  }

  return num !== 1;
};

const fitness = (entity) => {
  return entity.reduce((count, gene) => {
    return count + (isPrime(gene) ? 1 : 0);
  }, 0);
};

const Tournament = require('../lib/genetic');

const tournament = new Tournament({
  seed,
  fitness,
});


tournament.evolve();

// Log: the best candidates
console.log(tournament.best);