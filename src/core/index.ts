import { Client, ClientOptions, Collection } from 'discord.js';
import { Command, Event } from '@/types';

import * as commands from '@/commands';
import * as events from '@/events';

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

    public initCommands(): ExtendedClient {
        for (const key of Object.keys(commands)) {
            const command: Command = commands[key as keyof typeof commands];
            this.commands.set(command.data.name, command);
        }

        return this;
    }

    public initEvents(): ExtendedClient {
        for (const key of Object.keys(events)) {
            const event: Event = events[key as keyof typeof events];
            if (event.once) {
                this.once(event.name, (...args) => event.execute(...args));
            } else {
                this.on(event.name, (...args) => event.execute(...args));
            }
        }

        return this;
    }
};
