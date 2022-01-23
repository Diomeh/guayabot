const { Sequelize } = require('sequelize');
const logger = require('./logger');

const db = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host   : process.env.HOST,
    dialect: 'postgres',
    logging: logger.debug.bind(logger),
});

try {
    db.authenticate().then();
    logger.info('DB connection successfully established');
} catch (e) {
    logger.error('Unable to connect to the DB', e);
}

module.exports = db;
