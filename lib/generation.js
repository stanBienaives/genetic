

class Generation extends Array {

  /**
   * Get population and sorted by fitness
   * @return {Array} of object {entity, fitness} sorted by fitness
   */
  get leaderboard() {
    // Basic caching
    if (this._leadearboard)
      return this._leadearboard;

    // Calculate fitness for every entity
    this._leadearboard = this.map((entity) => {

      return {
        fitness: this.fitness(entity),
        entity,
      };
    })
    // And sort them based on fitness
      .sort((rank1, rank2) => {
        return this.optimize(rank1.fitness, rank2.fitness);
      });


    return this._leadearboard;
  }

  /**
   * Get Best of the generation
   * @returns {Array}  Return an entity
   */
  get best() {
    return this.leaderboard && this.leaderboard[0].entity;
  }


  /**
   * Calulate stats on the generation
   * @returns {Object} object containing max, mean, mean, stdev
   */
  stats() {
    const max = this.leaderboard[0].fitness;
    const min = this.leaderboard[this.leaderboard.length - 1].fitness;
    const mean = this.leaderboard.reduce((sum, occ) => sum + occ.fitness, 0) / this.leaderboard.length;
    const stdev = Math.sqrt(this.leaderboard
      .map((entity) => (entity.fitness - mean) * (entity.fitness - mean))
      .reduce((item, acc) => item + acc, 0) / this.leaderboard.length);

    return {
      max,
      min,
      mean,
      stdev,
    };

  }

  /**
   * Select n*2 entity in the population and return the n with the best fitness
   * @param  {Integer} nb=1 Number of entity to select
   * @returns {Array} Array of entities
   */
  select(nb = 1) {
    const selected = [];
    const selectedIndexes = [];

    while (selected.length < Math.min(nb * 2, this.length)) {
      const random = Math.floor(Math.random() * this.length);

      if (!selectedIndexes.includes(random)) {
        selected.push(this.leaderboard[random]);
        selectedIndexes.push(random);
      }
    }

    return selected
      .sort((rank1, rank2) => {
        return this.optimize(rank1.fitness, rank2.fitness);
      })
      .slice(0, nb)
      .map(({entity}) => entity);
  }

  /**
   * Default method for optmisizing (Maximise)
   * @param  {integer} fitness1 fitness 1
   * @param  {integer} fitness2 fitness 2
   * @return {integer} -1 or 1
   */
  defaultOptimize(fitness1, fitness2) {
    return fitness1 < fitness2 ? 1 : -1;
  }

  /**
   * Create from Array given a fitness
   * @param {object} {fitness, optimize}
   *  - fitness: (function for calculcating fitness given an entity
   *  - optimize: (function used to sort by fitness)
   * @param  {Array} entities entities default is empty array
   * @returns {Generation} this;
   */
  static create ({fitness, optimize}, entities = []) {
    const gen = new Generation(...entities);

    gen.fitness = fitness;
    gen.optimize = optimize || gen.defaultOptimize;

    return gen;
  }

}

module.exports = Generation;