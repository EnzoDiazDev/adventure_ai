import * as Discord from 'discord.js';

export default interface InteractionHandler {
  readonly version:number;
  readonly name:string;
  handle(interaction:Discord.Interaction):Promise<void>;
}
