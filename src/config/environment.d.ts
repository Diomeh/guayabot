/* eslint-disable no-unused-vars */
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly NODE_ENV: 'dev' | 'prod' | 'test';

            // Discord vars
            readonly BOT_TOKEN  : string;
            readonly CLIENT_ID  : string;
            readonly GUILD_ID   : string;

            // Database vars
            readonly DB_NAME    : string;
            readonly DB_USERNAME: string;
            readonly DB_PASSWORD: string;
            readonly DB_URL     : string;
        };
    };
};

export {};
