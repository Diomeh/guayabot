import { SlashCommandBuilder } from 'discord.js';
import { Command } from '@/types';

const command: Command = {
    data: new SlashCommandBuilder()
        .setName('guayando')
        .setDescription('guayando'),
    async execute(interaction) {
        await interaction.reply('guayando');
    },
};

export default command;
