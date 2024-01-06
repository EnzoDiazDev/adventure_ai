import * as Discord from 'discord.js';

import AdventureAi from 'src/discord/AdventureAi';
import InteractionUtils from 'src/discord/utils/interactions/InteractionUtils';
import Game from 'src/game/Game';
import Session from 'src/game/Session';

import InteractionHandler from '../InteractionHandler';

export default class Start implements InteractionHandler {
    public readonly version = 1;
    public readonly command = new Discord.SlashCommandBuilder();
    private readonly client:AdventureAi;

    constructor(client:AdventureAi) {
      this.client = client;

      this.command
        .setName('start')
        .setDescription('Inicia una nueva aventura.')
        .addStringOption(option => option.setName('name').setDescription('Nombre de la aventura.').setRequired(true))
        .addStringOption(option => option.setName('description').setDescription('Descripción de la aventura.').setRequired(true))
        .setDMPermission(false);
    }

    public async handle(interaction:Discord.ChatInputCommandInteraction) {
      try {
        const utils = new InteractionUtils(this.client, interaction);
        const name = interaction.options.getString('name');
        const description = interaction.options.getString('description');

        const guild = await utils.getGuild();
        if(!guild) {
          await utils.replyError('Este comando sólo puede ser utilizado en un servidor.');

          return;
        }

        const currentGame = this.client.games.get(guild.id);
        if(currentGame) {
          await utils.replyError('Ya existe una aventura en este servidor.');

          return;
        }

        const category = await guild.channels.create({
          name: name || 'AdventureAi',
          type: Discord.ChannelType.GuildCategory
        });

        const channel = await guild.channels.create({
          name: 'session',
          topic: description || 'Una emocionante aventura.',
          type: Discord.ChannelType.GuildText,
          parent: category
        });

        const role = await guild.roles.create({
          name: 'Player',
          color: 'Green',
          mentionable: true,
          position: 0
        });

        const newSession = new Session(channel.id, name, description);
        const newGame = new Game(guild.id, role.id, newSession);

        this.client.games.set(guild.id, newGame);

        await channel.send(`¡Bienvenidos a ${name || 'AdventureAi'}!`);
        await utils.replySuccess('Aventura creada con éxito.');
      }
      catch(error) {
        console.error(error);
        throw error;
      }
    }
}
