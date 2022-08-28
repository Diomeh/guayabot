import { logger } from '@/core';
import { Event } from '@/types';

const event: Event = {
    name: 'ready',
    once: true,
    execute(client: any) {
        logger.info(`Client ready as ${client.user.tag}`);
    },
};

export default event;
