import { ClientUser, CommandInteractionOptionResolver, SlashCommandBuilder } from 'discord.js';
import { Quote } from '@/models';
import { Command } from '@/types';

type QuoteField = {
    name: string;
    value: string;
    inline: boolean;
};

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

const command: Command = {
    data,
    async execute(interaction) {
        // TODO: replace manual indexing with buttons/interaction
        const options = (interaction.options as CommandInteractionOptionResolver);

        let start = options.getInteger('start', false) || 0;
        let limit = options.getInteger('count', false) || 10;

        // Prevent negative indexing
        start = start < 0 ? start * -1 : start;
        limit = limit < 0 ? limit * -1 : limit;

        const quotes: Array<Quote> = await Quote.findAll({
            offset: start,
            limit,
        });

        // // Here we feed the quotes to an embed
        const fields = buildEmbedFields(quotes);
        const user = (interaction.client.user as ClientUser);

        await interaction.reply({
            embeds: [{
                color    : 0x0099ff,
                title    : 'Lista de mensajes',
                author   : {
                    name    : user.tag,
                    icon_url: user.displayAvatarURL({
                        size: 16,
                    }),
                },
                fields,
                timestamp: new Date().toISOString(),
            }],
        });
    },
};

function buildEmbedFields(quotes: Array<Quote>|null): Array<QuoteField> {
    const fields: Array<QuoteField> = [];

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

export default command;
