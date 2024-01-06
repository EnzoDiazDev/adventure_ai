import * as Discord from 'discord.js';

export default interface EventHandler<Event extends keyof Discord.ClientEvents> {
  readonly version:number;
  readonly event:string;
  handle(...payload:Discord.ClientEvents[Event]):Promise<void>;
}
