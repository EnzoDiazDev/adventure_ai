import * as Discord from 'discord.js';

import Game from 'src/game/Game';

import EventHandlers from './event_handlers';
import InteractionHandlers from './interaction_handlers';
import SlashCommands from './interaction_handlers/slash_commands';

export default class AdventureAi extends Discord.Client {
  /** Provisorio por falta de base de datos */
  public readonly games = new Map<string, Game>();

  constructor(options:Discord.ClientOptions) {
    super(options);
    SlashCommands.client = this;

    this
      .on('ready', (...payload) => EventHandlers.get('ready').handle(...payload))
      .on('interactionCreate', (...payload) => EventHandlers.get('interactionCreate').handle(...payload));
  }

  public async start(token:string):Promise<void> {
    try {
      await this.login(token);

      const createInteractions = InteractionHandlers
        .getAllApplicationCommands()
        .map(applicationCommand => this.application.commands.create(applicationCommand));

      await Promise.all(createInteractions);

    } catch(error) {
      console.error(error);
      throw new Error(error);
    }
  }
}
