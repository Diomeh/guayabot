import { Client, ClientOptions, Collection } from 'discord.js';
import { Command } from '@/types';

export { default as logger } from '@/core/logger';
export { default as db } from '@/core/database';
export { default as CommandDeployer } from '@/core/deployCommands';

export class ExtendedClient extends Client {
    public commands: Collection<string, Command>;
    public events: Collection<string, any>;

    public constructor(options: ClientOptions) {
        super(options);
        this.commands = new Collection();
        this.events = new Collection();
    };
};
