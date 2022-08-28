// This is needed to prevent the compiler from complaining about the missing type definitions using the @ symbol.
import './paths';
import 'dotenv/config';

import { GatewayIntentBits } from 'discord.js';
import { ExtendedClient, logger, CommandDeployer } from '@/core';

if (process.argv.includes('--deploy')) {
    const index: number = process.argv.indexOf('--deploy');
    let deploy: string, id: string|undefined;

    // enforce id if --deploy guild is used with syntax --deploy guild=id
    if (process.argv[index + 1].includes('=')) {
        [deploy, id] = process.argv[index + 1].split('=');
    } else {
        deploy = process.argv[index + 1];
    }

    switch (deploy) {
        case 'global':
            CommandDeployer.deployGlobalCommands();
            break;

        case 'guild': {
            const guildId = id || process.env.GUILD_ID;
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
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.MessageContent,
    ],
});

client.initCommands()
    .initEvents()
    .once('ready', () => { logger.info(`Client logged in as ${client.user?.tag}!`); })
    .login(process.env.BOT_TOKEN);
