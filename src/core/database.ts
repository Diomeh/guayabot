import { logger } from '@/core';
import { Sequelize, Options } from 'sequelize';

let db: Sequelize;
const options: Options = {
    dialect : 'postgres',
    protocol: 'postgres',
};

if (process.env.NODE_ENV === 'prod') {
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
    Object.assign(options, {
        host: process.env.DB_HOST || process.env.HOST,
        logging: logger.debug.bind(logger),
    });

    db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, options);
}

db.authenticate()
    .then(() => logger.info('Database connected.'))
    .catch(error => {
        logger.error('Unable to connect to the DB');
        logger.error(error);

        // TODO: send message to discord channel

        process.exit(1);
    });

export default db;
