import { CommandInteractionOptionResolver, SlashCommandBuilder } from 'discord.js';
import { Command } from '@/types';

const command: Command = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Replies with your input!')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The input to echo back')
                .setRequired(true)),
    async execute(interaction) {
        const input = (interaction.options as CommandInteractionOptionResolver).getString('input') as string;
        await interaction.reply(input);
    },
};

export default command;
