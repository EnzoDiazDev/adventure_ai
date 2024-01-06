import * as Discord from 'discord.js';

import AdventureAi from 'src/discord/AdventureAi';

import InteractionHandler from '../InteractionHandler';

import Ping from './Ping';
import Start from './Start';

/** Factory de Slash Commands */
export default class SlashCommands {
  private static _client:Discord.Client;

  public static set client(client:Discord.Client) {
    this._client = client;
  }

  private static ping = new Ping();
  private static get start() {
    if(!this._client) throw new Error('No se ha asignado el cliente de Discord al factory de slash commands.');

    return new Start(this._client as AdventureAi);
  }

  public static get(command:string):Discord.ApplicationCommandDataResolvable {
    switch(command) {
      case 'ping':
        return this.ping.command;
      case 'start':
        return this.start.command;
      default:
        throw new Error(`No existe el slash command ${command}.`);
    }
  }

  public static getAll():InteractionHandler[] {
    return [
      this.ping,
      this.start
    ];
  }
}
