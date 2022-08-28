import { Logger } from '@/types';
import pino from 'pino';

let logger: Logger;

if (process.env.NODE_ENV === 'prod') {
    logger = {
        info: (message: string) => console.log(message),
        warn: (message: string) => console.warn(message),
        error: (message: string) => console.error(message),
        debug: (message: string) => console.log(message),
    };
} else {
    logger = pino();
}

export default logger;
