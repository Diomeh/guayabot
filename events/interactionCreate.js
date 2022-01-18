const logger = require('../logger');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) return;

        logger.info(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction of ${interaction.commandName}.`);

        try {
            await command.execute(interaction);
        }
        catch (error) {
            logger.warn(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    },
};
