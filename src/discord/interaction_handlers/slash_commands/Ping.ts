import * as Discord from 'discord.js';

new Discord.SlashCommandBuilder();
new Discord.ContextMenuCommandBuilder();

import InteractionHandler from '../InteractionHandler';

export default class Ping extends Discord.SlashCommandBuilder implements InteractionHandler {
    public readonly version = 1;

    constructor() {
      super();

      this
        .setName('ping')
        .setDescription('Responde con un pong!');
    }

    public async handle(interaction:Discord.ChatInputCommandInteraction) {
      try {
        await interaction.reply('Pong!');
      }
      catch(error) {
        console.error(error);
        throw error;
      }
    }
}
