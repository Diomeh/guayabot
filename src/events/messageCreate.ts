import { Event } from '@/types';
import { logger } from '@/core';
import { Quote } from '@/models';
import { Message, TextChannel } from 'discord.js';

const reply = (message: Message, question: string, quote: Quote) => {
    // TODO: workaround around 2000 character max length restriction
    // Send response and log
    message.reply(quote.answer)
        .then(() => {
            quote.increment('usage_count')
                .then(q => logger.info(`quote::${q.id} usage_count incremented to ${q.usageCount}`))
                .catch(logger.error);
            logger.info(`Replying to ${message.author.tag} on ${question}`);
        }).catch(logger.error);
};

const event: Event = {
    name: 'messageCreate',
    async execute(message: Message) {
        if (message.author.bot) return;

        const content = message.cleanContent.toLowerCase().replace(/\s+/gm, '_');

        // Send auto-reply to message if exists in database
        const quote = await Quote.findOne({ where: { question: content } });

        if (quote !== null) {
            logger.info(`${message.author.tag} in '${message.guild?.name} #${(message.channel as TextChannel).name}' said '${content}'`);
            logger.info(`Found quote::${quote.id} '${quote.answer}' for '${content}'`);
            reply(message, content, quote);
        } else if (message.mentions.users.size) {
            // message.mentions.users.each(async (user: any) => {
            //     // TODO: add mention auto-reply mechanism
            //     if (user.tag === 'Diomeh#0072') {
            //         await message.reply('Guayando!');
            //     }
            // });
        }
    },
};

export default event;
