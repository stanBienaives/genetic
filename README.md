# GENETIC TOURNAMENT

Genetic Tournament is a simple and configurable implementation of a genetic algorithm.
It spares you all the work of implementing your own.

# EXAMPLE

Let say I want to optimize an array of integer so that it has the more prime number in it. (Ok no need genetic algorithm for that but lets assume you are that lazy)

The `entity` would be the array of integer
The `fitness` function would be the number of prime number in the array

The algorithm will create an array of random number based on a `seed` function passed as an argument to generate the first population

Then it will calculate the fitness for every entity in the initial population

It will then generate a new population by mutating and crossing over genes from the most performant entities in the population

lets start then:

First if need a `seed` function to generate the first population

```javascript
// Function to generate an array of integer < 100000
const seed = () => {
  return Array.from(new Array(200), () => Math.floor(Math.random()* 10000)
}
```

I need now to create a fitness function that detects and count prime number.
```javascript
// First a basic function to dectect if a number is prime or not
const isPrime = num => {
  for(let i = 2; i < num; i++)
    if(num % i === 0) return false;
  return num !== 1;
}

// Count every prime number in the array
const fitness = (entity) => {
  entity.reduce((count, gene) => {
    return count + isPrime(gene) ? 1 : 0,
  },0)
}
```

Now let's the magic run:
```javascript
const Tournament = require('genetic-tournament');

tournament = new Tournament({
  seed,
  fitness
})

tournament.evolve();

console.log(tournament.best);
```

Now you have an array full of prime numbers... How useful could that be?

# GETTING STARTED

# ADVANCE CONFIGURATION



# USAGE
This algorithm can be used for implementing NEAT algorithm by passing the weights and biases of a neural networks as the `dna` to optimize


# CONTRIBUTIONS

You are welcome to contribute to the project
Please follow the coding guidelines and enrich the test.

## TESTING

```sh
npm test
```