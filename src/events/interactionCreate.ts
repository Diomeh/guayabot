import { ExtendedClient, logger } from '@/core';
import { Event } from '@/types';

const event: Event = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isCommand()) return;

        const command = (interaction.client as ExtendedClient).commands?.get(interaction.commandName);

        if (!command) return;

        // name prop not exists in channel
        // logger.info(`${interaction.user.tag} in #${interaction.channel?.name} triggered an interaction of ${interaction.commandName}.`);

        try {
            await command.execute(interaction);
        } catch (error) {
            logger.warn((error as Error).message);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    },
};

export default event;
