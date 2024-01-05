import * as Discord from 'discord.js';

import InteractionHandler from '../interaction_handlers/InteractionHandler';

import EventHandler from './EventHandler';

export default class OnInteractionCreate implements EventHandler<'interactionCreate'> {
  private interactionHandlers = new Discord.Collection<string, InteractionHandler>();
  public readonly version = 1;
  public readonly event = 'interactionCreate';

  public setInteractionHandler(interactionHandler:InteractionHandler):void {
    this.interactionHandlers.set(interactionHandler.name, interactionHandler);
  }

  public async handle(interaction:Discord.Interaction):Promise<void> {
    try {
      if(!interaction.isChatInputCommand()) return;

      const interactionHandler = this.interactionHandlers.get(interaction.commandName);
      if(!interactionHandler) return;

      await interactionHandler.handle(interaction);
    } catch(error) {
      console.error(error);
      throw error;
    }
  }

}
