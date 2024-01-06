import * as Discord from 'discord.js';

export default interface InteractionHandler {
  readonly version:number;
  readonly command:Discord.SlashCommandBuilder;
  handle(interaction:Discord.Interaction):Promise<void>;
}
