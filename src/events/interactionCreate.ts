import { ExtendedClient, logger } from '@/core';
import { Event } from '@/types';
import { Interaction, TextChannel } from 'discord.js';

const event: Event = {
    name: 'interactionCreate',
    async execute(interaction: Interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = (interaction.client as ExtendedClient).commands?.get(interaction.commandName);
        if (!command) return;

        logger.info(`${interaction.user.tag} in ` +
            `'${interaction.guild?.name} #${(interaction.channel as TextChannel).name}' ` +
            `triggered an interaction of '${interaction.commandName}'.`,
        );

        try {
            await command.execute(interaction);
        } catch (error) {
            logger.error((error as Error).message);
            await interaction.reply({
                content: 'Ocurrió un error al ejecutar el comando :(',
                ephemeral: true,
            });
        }
    },
};

export default event;
