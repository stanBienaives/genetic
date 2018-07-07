const seed = () => {
  return Array.from(new Array(200), () => Math.floor(Math.random()* 10000))
}
const isPrime = num => {
  for(let i = 2; i < num; i++)
    if(num % i === 0) return false;
  return num !== 1;
}
const fitness = (entity) => {
  return entity.reduce((count, gene) => {
    return count + (isPrime(gene) ? 1 : 0);
  }, 0)
}
const Tournament = require('../lib/genetic');

tournament = new Tournament({
  seed,
  fitness,
  config: {
    size: 200,
    crossover: 0.1,
    mutation: 0.1,
    iterations: 200,
  }
})


tournament.evolve();

console.log(tournament.best);