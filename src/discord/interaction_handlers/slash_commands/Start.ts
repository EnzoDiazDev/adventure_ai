import * as Discord from 'discord.js';

import InteractionHandler from '../InteractionHandler';

export default class Start extends Discord.SlashCommandBuilder implements InteractionHandler {
    public readonly version = 1;

    constructor() {
      super();

      this
        .setName('start')
        .setDescription('Inicia una nueva aventura.')
        .addStringOption(option => option.setName('name').setDescription('Nombre de la aventura.').setRequired(true))
        .addStringOption(option => option.setName('description').setDescription('Descripción de la aventura.').setRequired(true))
        .setDMPermission(false);
    }

    public async handle(interaction:Discord.ChatInputCommandInteraction) {
      try {
        await interaction.reply('lalalal');
      }
      catch(error) {
        console.error(error);
        throw error;
      }
    }
}
