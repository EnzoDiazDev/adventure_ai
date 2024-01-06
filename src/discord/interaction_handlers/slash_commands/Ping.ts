import * as Discord from 'discord.js';

import InteractionHandler from '../InteractionHandler';

export default class Ping implements InteractionHandler {
    public readonly version = 1;
    public readonly command = new Discord.SlashCommandBuilder();

    constructor() {

      this.command
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
