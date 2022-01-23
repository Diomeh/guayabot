const { SlashCommandBuilder } = require('@discordjs/builders');
const Quote                   = require('../models/quote');
const logger                  = require('../logger');

const data = new SlashCommandBuilder()
    .setName('quote')
    .setDescription('adds a quote to the auto-reply list')
    .addStringOption(option =>
        option.setName('question')
            .setDescription('the text to look for auto-reply')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('answer')
            .setDescription('the auto-reply text')
            .setRequired(true));

module.exports = {
    data: data,
    async execute(interaction) {
        const question = interaction.options.getString('question');
        const answer   = interaction.options.getString('answer');

        Quote.create({
            question,
            answer,
        }).then(async quote => {
            logger.info(`'${interaction.user.tag}' created 'quote::id::${quote.id}'`);
            await interaction.reply(`Quote '${question}' created`);
        }).catch(async error => {
            logger.info(`'${interaction.user.tag}' triggered an error while creating a quote`, error);
            await interaction.reply('Could not create quote');
        });
    },
};
