

class Generation extends Array {

  /**
   * Get population and sorted by fitness
   * @return {Array} of object {entity, fitness} sorted by fitness
   */
  get leaderboard() {
    // Basic caching
    if (this.leadearboard)
      return this.leadearboard;

    // Calculate fitness for every entity
    this.leadearboard = this.map((entity) => {
      return {
        fitness: this.fitness(entity),
        entity,
      };
    })
    // And sort them base on fitness
      .sort((fit1, fit2) => {
        return fit1.fitness < fit2.fitness ? 1 : -1;
      });

    return this.leadearboard;
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

    while (selected.length < nb * 2) {
      const random = Math.floor(Math.random() * this.length);

      selected.push(this.leadearboard[random]);
    }

    return selected
      .sort((comp1, comp2) => {
        return comp1.fitness < comp2.fitness ? 1 : -1;
      })
      .slice(0, nb)
      .map(({entity}) => entity);
  }

}

module.exports = Generation;