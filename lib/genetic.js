const Generation = require('./generation');

class Genetic {

  /**
   * Constructor
   * @param {function} {seed function that returns an entity
   * @param {function} optimize function that serve as the optimizer of fitness
   * @param {function} fitness function to calculcate fitness given an entity
   * @param {function} mutate (optional)function for mutation
   * @param {function} crossover} (optional) function for cross two entities
   * @param {Ojbect} config} configuration options for the algorithm values can be
   *  - crossover: probability of crossover (default 0.1)
   *  - mutation: probability of crossover (default 0.2)
   *  - iterations: number of generations
   *  - survivals: number of fittest entity that survives from a generation to another
   * @return {Genetic} this
   */
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
    this.config = Object.assign(this.defaultConfig, config);
    this.currentIteration = 0;

    this.currentGeneration = Generation.create({fitness}, Array.from(new Array(this.config.size), () => this.seed()));
    this.currentGeneration.fitness = this.fitness;
  }

  /**
   * Default configuration
   * @return {object}  default configuration
   */
  get defaultConfig() {
    return {
      size      : 200,
      mutation  : 0.1,
      crossover : 0.1,
      iterations: 100,
    };
  }

  /**
   *  Run each iterations and breed
   *  @return {undefined};
   */
  evolve() {

    while (this.currentIteration < this.config.iterations) {
      const newGen = Generation.create({
        fitness : this.fitness,
        optimize: this.optimize,
      });

      // Keep survivors
      let counter = 0;

      while (newGen.length < this.config.survivals) {
        newGen.push(this.currentGeneration.leaderboard[counter].entity);
        counter += 1;
      }

      while (newGen.length < this.config.size) {

        // Mutate
        if (Math.random() < this.config.mutation)
          newGen.push(this.mutate(...this.currentGeneration.select(1)));

        // Crossover
        else if (Math.random() < this.config.crossover)
          newGen.push(this.crossover(...this.currentGeneration.select(2)));

        // Sponteneous generation ?
      }

      this.currentGeneration = newGen;
      this.currentGeneration.fitness = this.fitness;
      this.currentIteration += 1;
      const {max, min, mean, stdev} = this.currentGeneration.stats();

      console.log(`max: ${max} | min: ${min} | mean: ${mean} | stdev: ${stdev}`);
    }
  }

  /**
   * Returns best entity in the generation
   * @returns {Array} Entity
   */
  get best() {
    return this.currentGeneration.best;
  }

  /**
   * Default function for mutation. Swap genes
   * @param  {Array} dna entity
   * @return {Array} entity
   */
  defaultMutate (dna) {
    const eject = Math.floor(Math.random() * dna.length);
    const replace = Math.floor(Math.random() * dna.length);

    dna[eject] = dna[replace];

    return new Array(...dna);
  }

  /**
   * Default function for crossover. cut and paste portions of dna
   * @param  {Array} father father dna
   * @param  {Array} mother mother dna
   * @returns {Array} Son
   */
  defaultCrossover(father, mother) {

    const cut1 = Math.floor(Math.random() * mother.length);
    const cut2 = Math.floor(Math.random() * (father.length - cut1)) + cut1;

    const slice1 = mother.slice(0, cut1);
    const slice2 = father.slice(cut1, cut2);
    const slice3 = mother.slice(cut2, mother.length);
    const cross = slice1.concat(slice2).concat(slice3);
    const son = cross;

    return son;
  }

}


module.exports = Genetic;