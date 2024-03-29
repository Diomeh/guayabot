import { SlashCommandBuilder, CommandInteraction } from 'discord.js';

export declare type CommandBuilder = Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;

export declare type Command = {
    data: CommandBuilder;
    execute(interaction: CommandInteraction): Promise<void>|void;
};

export declare type Event = {
    name: string;
    once?: boolean;
    execute(...args: Array<any>): Promise<void> | void;
};

export declare type Logger = {
    info: (message: string) => void;
    warn: (message: string) => void;
    error: (message: string) => void;
    debug: (message: string) => void;
};
