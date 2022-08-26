const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('guayando')
        .setDescription('guayando'),
    async execute(interaction) {
        await interaction.reply('guayando');
    },
};
