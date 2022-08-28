import { SlashCommandBuilder } from 'discord.js';
import { Command } from '@/types';

const command: Command = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Replies with server information.'),
    async execute(interaction) {
        await interaction.reply(`Server name: ${interaction.guild?.name}\nTotal members: ${interaction.guild?.memberCount}`);
    },
};

export default command;
