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

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN || '');

rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID || '', process.env.GUILD_ID || ''), { body: jsonCommands })
    .then(() => logger.info('Successfully registered application commands.'))
    .catch(logger.error);
