class Logger {
  static info(...args) {
    if (process.env.LOG_LEVEL === 'info')
      console.log(...args);
  }
}
module.exports = Logger;