import * as Discord from 'discord.js';

import Ping from './Ping';
import Start from './Start';

/** Factory de Slash Commands */
export default class SlashCommands {
  private static ping = new Ping();

  private static start = new Start();

  public static get(command:string):Discord.ApplicationCommandDataResolvable {
    switch(command) {
      case 'ping':
        return this.ping;
      case 'start':
        return this.start;
      default:
        throw new Error(`No existe el slash command ${command}.`);
    }
  }

  public static getAll():Discord.ApplicationCommandDataResolvable[] {
    return [
      this.ping,
      this.start
    ];
  }
}
