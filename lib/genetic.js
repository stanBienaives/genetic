
class Generation extends Array {

  get pop() {
    if (this._pop)
      return this._pop
    
    this._pop = this.map((entity) => {
      return {
        fitness: this.fitness(entity),
        entity
      }
    })
    .sort((fit1, fit2) => {
        return (fit1.fitness < fit2.fitness)? 1 : -1;
    })

    return this._pop;
  }


  get best() {
    return this.pop && this.pop[0].entity;
  }

  stats() {
    const max = this.pop[0].fitness;
    const min = this.pop[this.pop.length - 1].fitness;
    const mean = this.pop.reduce((sum, occ) => sum + occ.fitness, 0) / this.pop.length;
    const stdev = Math.sqrt(this.pop
      .map((a) =>  (a.fitness - mean) * (a.fitness - mean))
      .reduce((a, b) => a+b, 0) / this.pop.length);

    console.log(`max: ${max} | min: ${min} | mean: ${mean} | stdev: ${stdev}`);

  }

  select(nb = 1) {
    const selected = [];
    while(selected.length < nb*2) {
      const random = Math.floor(Math.random()*this.length);
      selected.push(this._pop[random].entity)
    }

    selected.sort((a,b) => a.fitness < b.fitness? 1 : -1)
    return selected.slice(0,nb);
  }

}

class Genetic {

  constructor({
    seed,
    optimize,
    mutate,
    crossover,
    fitness,
    config,
  }) {
    this.seed = seed;
    this.optimize = optimize;
    this.mutate = mutate || this.defaultMutate;
    this.crossover = crossover || this.defaultCrossover;
    this.fitness = fitness;
    this.config = config;
    this.currentIteration = 0;
    this.currentGeneration = Generation.from(new Array(this.config.size), () => this.seed())
    this.currentGeneration.fitness = this.fitness;

    // , "crossover": 0.9
    // , "mutation": 0.2
    // , "iterations": 100
    // , "fittestAlwaysSurvives": true
    // , "maxResults": 100
    // , "webWorkers": true
    // , "skip": 0
  }

  evolve() {

    while(this.currentIteration < this.config.iterations) {
      const newGen = new Generation();
      // fittest always survives
      let counter = 0;
      while(newGen.length < this.config.survivals) {
        newGen.push(this.currentGeneration.pop[counter].entity);
        counter++;
      }
      while(newGen.length < this.config.size) {
        if (Math.random() < this.config.mutation) {
          newGen.push(this.mutate(...this.currentGeneration.select(1)))
        } else if (Math.random() < this.config.crossover) {
          newGen.push(this.crossover(...this.currentGeneration.select(2)))
        }
        // } else {
        //   newGen.push(this.seed());
        // }
      }

      this.currentGeneration = newGen;
      this.currentGeneration.fitness = this.fitness;
      this.currentIteration++;
      this.currentGeneration.stats();
    }
  }

  get iteration() {
    return this.currentIteration;
  }

  get best() {
    return this.currentGeneration.best;
  }

  defaultMutate (entity)  {
    const eject = Math.floor(Math.random() * entity.length)
    const replace = Math.floor(Math.random() * entity.length)
    entity[eject] = entity[replace]; 

    return new Array(...entity);
  }

  defaultCrossover(father, mother) {

    const cut1 = Math.floor(Math.random()* mother.length);
    const cut2 = Math.floor(Math.random()* (father.length - cut1)) + cut1;

    const slice1 = mother.slice(0,cut1);
    const slice2 = father.slice(cut1, cut2)
    const slice3 = mother.slice(cut2, mother.length);
    const cross = slice1.concat(slice2).concat(slice3);
    const son = cross;

    return son;
  }

}


module.exports = Genetic;