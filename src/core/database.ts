import { logger } from '@/core';
import { Sequelize, Options } from 'sequelize';

let db: Sequelize;
const options: Options = {
    dialect : 'postgres',
    protocol: 'postgres',
};

if (process.env.NODE_ENV === 'prod') {
    logger.info('App running on heroku dyno');
    Object.assign(options, {
        logging: false,
        dialectOptions: {
            sslmode: 'require',
            ssl: {
                rejectUnauthorized: false,
            },
        },
    });

    db = new Sequelize(process.env.DB_URL, options);
} else {
    logger.info('App running on localhost');
    Object.assign(options, {
        host: process.env.HOST,
        logging: logger.debug.bind(logger),
    });

    db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, options);
}

try {
    db.authenticate().then(() => logger.info('Database connected.'));
} catch (e) {
    logger.error('Unable to connect to the DB');
    logger.error((e as Error).message);
}

export default db;