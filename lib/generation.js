

class Generation extends Array {

  /**
   * Get population and sorted by fitness
   * @return {Array} of object {entity, fitness} sorted by fitness
   */
  get pop() {
    // Basic caching
    if (this._pop)
      return this._pop;

    // Calculate fitness for every entity
    this._pop = this.map((entity) => {
      return {
        fitness: this.fitness(entity),
        entity,
      };
    })
    // And sort them base on fitness
      .sort((fit1, fit2) => {
        return fit1.fitness < fit2.fitness ? 1 : -1;
      });

    return this._pop;
  }

  /**
   * Get Best of the generation
   * @returns {Array}  Return an entity
   */
  get best() {
    return this.pop && this.pop[0].entity;
  }


  /**
   * Calulate stats on the generation
   * @returns {Object} object containing max, mean, mean, stdev
   */
  stats() {
    const max = this.pop[0].fitness;
    const min = this.pop[this.pop.length - 1].fitness;
    const mean = this.pop.reduce((sum, occ) => sum + occ.fitness, 0) / this.pop.length;
    const stdev = Math.sqrt(this.pop
      .map((entity) => (entity.fitness - mean) * (entity.fitness - mean))
      .reduce((item, acc) => item + acc, 0) / this.pop.length);

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

      selected.push(this._pop[random]);
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