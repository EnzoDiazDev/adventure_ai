import * as Discord from 'discord.js';

import InteractionHandlers from '../interaction_handlers';

import EventHandler from './EventHandler';

export default class OnInteractionCreate implements EventHandler<'interactionCreate'> {
  public readonly version = 1;
  public readonly event = 'interactionCreate';

  public async handle(interaction:Discord.Interaction):Promise<void> {
    try {
      if(!interaction.isChatInputCommand()) return;

      const interactionHandler = InteractionHandlers.get(interaction.commandName);
      if(!interactionHandler) return;

      await interactionHandler.handle(interaction);
    } catch(error) {
      console.error(error);
      throw error;
    }
  }

}
