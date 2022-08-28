import { SlashCommandBuilder } from 'discord.js';
import { Command } from '@/types';

const command: Command = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Replies with user information.'),
    async execute(interaction) {
        await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
    },
};

export default command;
