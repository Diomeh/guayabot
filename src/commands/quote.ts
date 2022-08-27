import { CommandInteractionOptionResolver, SlashCommandBuilder } from "discord.js";
import { Quote } from "@/models";
import { logger } from "@/core";
import { Command } from "@/types";

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

const command: Command = {
    data,
    async execute(interaction) {
        const options = (interaction.options as CommandInteractionOptionResolver);

        const question = options.getString('question');
        const answer   = options.getString('answer');

        Quote.create({
            question,
            answer,
        }).then(async quote => {
            logger.info(`'${interaction.user.tag}' created 'quote::id::${quote.id}'`);
            await interaction.reply(`Quote '${question}' created`);
        }).catch(async error => {
            logger.error(`'${interaction.user.tag}' triggered an error while creating a quote`);
            logger.error(error);
            await interaction.reply('Could not create quote');
        });
    },
};
