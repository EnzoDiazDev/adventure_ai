import * as Discord from 'discord.js';

import EventHandlers from './event_handlers';
import InteractionHandlers from './interaction_handlers';

export default class AdventureAi extends Discord.Client {

  constructor(options:Discord.ClientOptions) {
    super(options);

    this
      .on('ready', (...payload) => EventHandlers.get('ready').handle(...payload))
      .on('interactionCreate', (...payload) => EventHandlers.get('interactionCreate').handle(...payload));
  }

  public async start(token:string):Promise<void> {
    try {
      await this.login(token);

      await this.application.commands.create(InteractionHandlers.getApplicationCommand('ping'));
    } catch(error) {
      console.error(error);
      throw new Error(error);
    }
  }
}
