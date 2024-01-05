import * as Discord from 'discord.js';

import EventHandler from './EventHandler';
import OnInteractionCreate from './OnInteractionCreate';
import OnReady from './OnReady';

/** Factory de event handlers. */
export default class EventHandlers {
  private static get onReady() {
    return new OnReady();
  }

  private static get onInteractionCreate() {
    const handler = new OnInteractionCreate();

    return handler;
  }

  public static get<Event extends keyof Discord.ClientEvents>(event:Event):EventHandler<Event> {
    switch(event) {
      case 'ready':
        return this.onReady as EventHandler<Event>;
      case 'interactionCreate':
        return this.onInteractionCreate as EventHandler<Event>;
      default:
        throw new Error(`No existe un event handler para el evento ${event}.`);
    }
  }
}
