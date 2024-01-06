import * as Discord from 'discord.js';

import InteractionHandler from './InteractionHandler';
import SlashCommands from './slash_commands';

/** Factory de interaction handlers. */
export default class InteractionHandlers {
  public static get(interactionName:string):InteractionHandler {
    const interactions = [...SlashCommands.getAll()];

    return interactions.find((interactionHandler) => {
      if(interactionHandler.command.name === interactionName) return interactionHandler;
    });
  }

  public static getAllApplicationCommands():Discord.ApplicationCommandDataResolvable[] {
    return SlashCommands.getAll().map(handler => handler.command);
  }
}
