import * as Discord from 'discord.js';

import OnInteractionCreate from './event_handlers/OnInteractionCreate';
import OnReady from './event_handlers/OnReady';
import Ping from './interaction_handlers/slash_commands/Ping';

export default class AdventureAi extends Discord.Client {
  private readonly onReadyHandler = new OnReady();
  private readonly onInteractionCreateHandler = new OnInteractionCreate();
  private ping = new Ping();

  constructor(options:Discord.ClientOptions) {
    super(options);

    this.onInteractionCreateHandler.setInteractionHandler(this.ping);

    this
      .on('ready', (...payload) => this.onReadyHandler.handle(...payload))
      .on('interactionCreate', (...payload) => this.onInteractionCreateHandler.handle(...payload));
  }

  public async start(token:string):Promise<void> {
    try {
      await this.login(token);

      await this.application.commands.create(this.ping);
    } catch(error) {
      console.error(error);
      throw new Error(error);
    }
  }
}
