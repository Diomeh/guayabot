const { SlashCommandBuilder } = require('@discordjs/builders');
const Quote                   = require('../models/quote');
// const logger                  = require('../logger');

const data = new SlashCommandBuilder()
    .setName('listq')
    .setDescription('Muestra todos los mensajes configurados para auto-reply')
    .addIntegerOption(option =>
        option.setName('start')
            .setDescription('nose, seguro quite esto despues')
            .setRequired(false))
    .addIntegerOption(option =>
        option.setName('count')
            .setDescription('cantidad de opciones a mostrar, 10 por defecto')
            .setRequired(false));

module.exports = {
    data: data,
    async execute(interaction) {
        // TODO: replace manual indexing with buttons/interaction
        let start = interaction.options.getInteger('start', false) || 0;
        let limit = interaction.options.getInteger('count', false) || 10;

        // Prevent negative indexing
        start = start < 0 ? start * -1 : start;
        limit = limit < 0 ? limit * -1 : limit;

        const quotes = await Quote.findAll({
            offset: start,
            limit : limit,
        });

        // // Here we feed the quotes to an embed
        const fields = buildEmbedFields(quotes);

        await interaction.reply({
            embeds: [{
                color    : 0x0099ff,
                title    : 'Lista de mensajes',
                author   : {
                    name    : interaction.client.user.tag,
                    icon_url: interaction.client.user.displayAvatarURL({
                        size: 16,
                    }),
                },
                fields   : fields,
                timestamp: new Date(),
            }],
        });
    },
};

function buildEmbedFields(quotes) {
    const fields = [];

    if (quotes === null || quotes.length === 0) {
        return fields;
    }

    for (const key in quotes) {
        fields.push({
            name  : quotes[key].question.replace('_', '-'),
            value : quotes[key].answer.length < 50 ? quotes[key].answer : quotes[key].answer.substr(0, 50) + '...',
            inline: false,
        });
    }

    return fields;
}
