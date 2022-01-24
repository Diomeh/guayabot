const Quote  = require('../models/quote');
const logger = require('../logger');

const reply = (message, question, quote) => {
    // Send response and log
    message.reply(quote.answer)
        .then(() => {
            quote.increment('usage_count').then(q => logger.info(`quote::${q.id} usage_count incremented to ${q.usageCount}`));
            logger.info(`Replying to ${message.author.tag} on ${question}`);
        }).catch(logger.error);
};

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot) return;

        const content = message.content.toLowerCase().replace(/\s+/gm, '_');

        // Send auto-reply to message if exists in database
        const quote = await Quote.findOne({ where: { question: content } });
        if (quote !== null) {
            reply(message, content, quote);
        } else if (message.mentions.users.size) {
            message.mentions.users.each(async user => {
                // TODO: add mention auto-reply mechanism
                if (user.tag === 'Diomeh#0072') {
                    await message.reply('Guayando!');
                }
            });
        }
    },
};
