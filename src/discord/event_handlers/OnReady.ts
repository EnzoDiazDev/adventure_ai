import * as Discord from 'discord.js';

import EventHandler from './EventHandler';

export default class OnReady implements EventHandler<'ready'> {
  public readonly version = 1;
  public readonly event = 'ready';

  public async handle(client:Discord.Client):Promise<void> {
    try {
      console.log('Listo para interactuar.');
    } catch(error) {
      console.error(error);
      throw error;
    }
  }
}
