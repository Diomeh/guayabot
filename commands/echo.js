const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Replies with your input!')
    .addStringOption(option =>
        option.setName('input')
            .setDescription('The input to echo back')
            .setRequired(true));

module.exports = {
    data: data,
    async execute(interaction) {
        const input = interaction.options.getString('input');
        await interaction.reply(input);
    },
};
