let logger = {};
if (process.env.DATABASE_URL) {
    logger.info  = console.log;
    logger.error = console.error;
    logger.debug = console.debug;
} else {
    logger = require('pino').pino();
}

module.exports = logger;
