import * as Discord from 'discord.js';

import InteractionHandler from './InteractionHandler';
import Ping from './slash_commands/Ping';

/** Factory de interaction handlers. */
export default class InteractionHandlers {
  private static get ping() {
    return new Ping();
  }

  public static get(interaction:string):InteractionHandler | null {
    switch(interaction) {
      case 'ping':
        return this.ping;
      default:
        return null;
    }
  }

  public static getApplicationCommand(command:string):Discord.ApplicationCommandDataResolvable {
    switch(command) {
      case 'ping':
        return this.ping as Discord.ApplicationCommandDataResolvable;
      default:
        throw new Error(`No existe un interaction handler para el comando ${command}.`);
    }
  }
}
