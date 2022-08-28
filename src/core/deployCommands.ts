import { REST } from '@discordjs/rest';
import { RESTPostAPIApplicationCommandsJSONBody, Routes } from 'discord.js';
import { logger } from '@/core';
import { Command } from '@/types';
import * as commands from '@/commands';

const jsonCommands: Array<RESTPostAPIApplicationCommandsJSONBody> = [];

for (const key of Object.keys(commands)) {
    const command: Command = commands[key as keyof typeof commands];
    jsonCommands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);
export default class CommandDeployer {
    public static deployGuildCommands = (guildId: string = process.env.GUILD_ID): void => {
        logger.info(`Deploying commands for guild ${guildId}`);
        rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId), { body: jsonCommands })
            .then(() => logger.info('Successfully registered application guild commands.'))
            .catch(logger.error);
    };

    public static deployGlobalCommands = (): void => {
        logger.info('Deploying global commands');
        rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: jsonCommands })
            .then(() => logger.info('Successfully registered application global commands.'))
            .catch(logger.error);
    };

    public static deployAll = (guildId: string = process.env.GUILD_ID): void => {
        this.deployGuildCommands(guildId);
        this.deployGlobalCommands();
    };
};
