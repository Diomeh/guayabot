// TODO: fix logger crashes
const logger = require('../logger');

const reply = (message, question, answer) => {
    message.reply(answer)
        .then(() => logger.info(`Replying to ${message.author.tag} on ${question}`))
        .catch(logger.error);
};

module.exports = {
    name: 'messageCreate',
    execute(message) {
        if (message.author.bot) return;

        const content = message.content.toLowerCase();

        // TODO: refactor this into a DBMS
        if (content.startsWith('guayando')) {
            reply(message, 'guayando', 'Guayando! turu turuu ruuruu ru tu');
        } else if (content.startsWith('reconoceme') || content.startsWith('reconozcame') || content.startsWith('acknowledge me')) {
            reply(message, 'acknowledge me', 'Por favor ve al psicologo');
        } else if (content.startsWith('epale')) {
            reply(message, 'epale', 'Epale mi pana, todo fino?');
        } else if (content.startsWith('aguacate con arroz')) {
            reply(message, 'aguacate-con-arroz', 'mondongo');
        } else if (content.startsWith('no te atrevas a ser amargado')) {
            reply(message, 'new-day', 'Aplaude a tus campeones en pareja y siente el podeeeeer');
        } else if (content === 'es el') {
            reply(message, 'don-comedias', 'El legendario súper comediante\n');
        } else if (content === '\u{1F921}') {
            reply(message, 'don-comedias-emoji', 'Me llama usted, entonces voy, Don comedia es quien yo soy \u{1F921}');
        } else if (content === '\u{1F446}' || content === '\u261D') {
            reply(message, 'el-jefe-tribal', 'Arrodíllense y reconozcan al rey, el número uno, el que pone la comida sobre la mesa, el perrote, el dueño de todos los patios, el primo de la piedra, el poder personificado, la fuerza del escudo, EL TIPO, el que enterró al Undertaker\n\nEL JEFE TRIBAL');
        }
    },
};
