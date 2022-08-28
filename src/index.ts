// This is needed to prevent the compiler from complaining about the missing type definitions using the @ symbol.
import './paths';

import { GatewayIntentBits } from 'discord.js';
import { ExtendedClient, logger } from '@/core';

import 'dotenv/config';

logger.info(`Application started in '${process.env.NODE_ENV}' mode.`);

const client = new ExtendedClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
    ],
});

// const commandFiles = fs.readdirSync('src/commands').filter(file => file.endsWith('.js'));
// const eventFiles = fs.readdirSync('src/events').filter(file => file.endsWith('.js'));

// // Require all commands
// for (const file of commandFiles) {
//     const command = require(`./commands/${file}`);
//     // Set a new item in the Collection
//     // With the key as the command name and the value as the exported module
//     client.commands.set(command.data.name, command);
// }

// // Require all events
// for (const file of eventFiles) {
//     const event = require(`./events/${file}`);
//     if (event.once) {
//         client.once(event.name, (...args) => event.execute(...args));
//     } else {
//         client.on(event.name, (...args) => event.execute(...args));
//     }
// }

client.once('ready', () => {
    logger.info(`Client logged in as ${client.user?.tag}!`);
});

client.login(process.env.BOT_TOKEN);
