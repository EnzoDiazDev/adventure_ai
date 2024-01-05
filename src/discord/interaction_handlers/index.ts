import * as Discord from 'discord.js';

import InteractionHandler from './InteractionHandler';
import SlashCommands from './slash_commands';

/** Factory de interaction handlers. */
export default class InteractionHandlers {
  public static get(interactionName:string):InteractionHandler {
    const interactions = [...SlashCommands.getAll()] as unknown as InteractionHandler[];

    return interactions.find((interactionHandler) => interactionHandler.name === interactionName);
  }

  public static getAllApplicationCommands():Discord.ApplicationCommandDataResolvable[] {
    return SlashCommands.getAll();
  }
}
