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

        // TODO: parse and simplify string to improve handling
        const content = message.content.toLowerCase();

        // Send auto-reply to message if exists in database
        const quote = await Quote.findOne({ where: { question: content } });
        if (quote !== null) reply(message, content, quote);

        // TODO: find out how to handle emojis
        if (content === '\u{1F921}') {
            reply(message, 'don-comedias-emoji', 'Me llama usted, entonces voy, Don comedia es quien yo soy \u{1F921}');
        } else if (content === '\u{1F446}' || content === '\u261D') {
            reply(message, 'el-jefe-tribal', 'Arrodíllense y reconozcan al rey, el número uno, el que pone la comida sobre la mesa, el perrote, el dueño de todos los patios, el primo de la piedra, el poder personificado, la fuerza del escudo, EL TIPO, el que enterró al Undertaker\n\nEL JEFE TRIBAL');
        }
    },
};
