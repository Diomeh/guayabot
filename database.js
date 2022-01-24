const { Sequelize } = require('sequelize');
const logger        = require('./logger');

let db;
const options = {
    dialect : 'postgres',
    protocol: 'postgres',
    logging : logger.debug.bind(logger),
};

if (process.env.DATABASE_URL) {
    // We are running in a heroku dyno
    logger.info('App running on heroku dyno');
    options.dialectOptions = {
        sslmode: 'require',
        ssl: {
            rejectUnauthorized: false,
        },
    };
    db = new Sequelize(process.env.DATABASE_URL, options);
} else {
    // Running in localhost
    logger.info('App running on localhost');
    options.host = process.env.HOST;
    db = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, options);
}

try {
    // Ignore returned promise
    db.authenticate().then();
    logger.info('DB connection successfully established');
} catch (e) {
    logger.error('Unable to connect to the DB', e);
}

module.exports = db;
