// This is needed to prevent the compiler from complaining about the missing type definitions using the @ symbol.
import './paths';
import 'dotenv/config';

import { GatewayIntentBits } from 'discord.js';
import { ExtendedClient, logger, CommandDeployer } from '@/core';

if (process.argv.includes('--deploy')) {
    const index = process.argv.indexOf('--deploy');
    const deploy = process.argv[index + 1];

    switch (deploy) {
        case 'global':
            CommandDeployer.deployGlobalCommands();
            break;

        case 'guild': {
            const guildId = process.argv[index + 2] || process.env.GUILD_ID;
            CommandDeployer.deployGuildCommands(guildId);
            break;
        }

        case 'all':
            CommandDeployer.deployAll();
            break;

        default:
            logger.error(`Invalid deploy option: Expected: 'all|global|guild'; Found: ${deploy}`);
            process.exit(1);
    }

    if (process.argv.includes('--exit')) {
        process.exit(0);
    }
}

logger.info(`Application started in '${process.env.NODE_ENV}' mode.`);

const client = new ExtendedClient({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping],
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
