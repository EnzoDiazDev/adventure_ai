import * as Discord from 'discord.js';

type SomeInteraction = Discord.ChatInputCommandInteraction<Discord.CacheType> | Discord.MessageContextMenuCommandInteraction<Discord.CacheType> | Discord.UserContextMenuCommandInteraction<Discord.CacheType>;

export default abstract class InteractionUtil {
  protected client:Discord.Client;
  protected interaction:SomeInteraction;

  constructor(client:Discord.Client, interaction:SomeInteraction) {
    this.client = client;
    this.interaction = interaction;
  }

  public async replyError(content:string):Promise<void> {
    try {
      let reply:Discord.InteractionResponse | Discord.Message;

      if(this.interaction.replied) reply = await this.interaction.editReply({ content });
      else reply = await this.interaction.reply({ content, ephemeral: true });

      if(reply) setTimeout(() => { reply.delete(); }, 5000);

    } catch(error) {
      console.error(error);
    }
  }

  public async replySuccess(content:string, ephemeral:boolean = false):Promise<void> {
    try {
      if(this.interaction.replied) await this.interaction.editReply({ content });
      else await this.interaction.reply({ content, ephemeral });

    } catch(error) {
      this.replyError('Ha ocurrido un error al resolver esta interacción.');
    }
  }

  public async getGuild(guildId?:string):Promise<null | Discord.Guild> {
    try {
      if(!guildId && this.interaction.guildId) guildId = this.interaction.guildId;
      else if(!guildId) return null;

      const cachedGuild = this.client.guilds.cache.get(guildId);
      if(cachedGuild) return cachedGuild;

      return await this.client.guilds.fetch(guildId);
    } catch(error) {
      console.error(error);
      this.replyError('Ha ocurrido un error al obtener el servidor.');

      return null;
    }
  }

  public async getMember(memberId?:string):Promise<Discord.GuildMember | null> {
    try {
      const guild = await this.getGuild();
      if(!guild) return null;

      if(!memberId && this.interaction.user) memberId = this.interaction.user.id;
      else if(!memberId) return null;

      const cachedMember = guild.members.cache.get(memberId);
      if(cachedMember) return cachedMember;

      return await guild.members.fetch(memberId);
    } catch(error) {
      console.error(error);
      this.replyError('Ha ocurrido un error al obtener este miembro.');

      return null;
    }
  }

  public async getRole(roleId:string):Promise<Discord.Role | null> {
    try {
      const guild = await this.getGuild();
      if(!guild) return null;

      const cachedRole = guild.roles.cache.get(roleId);
      if(cachedRole) return cachedRole;

      return await guild.roles.fetch(roleId);
    } catch(error) {
      console.error(error);
      this.replyError('Ha ocurrido un error al obtener este rol.');

      return null;
    }
  }

  public async getChannel(channelId?:string):Promise<Discord.GuildBasedChannel | null> {
    try {
      const guild = await this.getGuild();
      if(!guild) return null;

      if(!channelId && this.interaction.channelId) channelId = this.interaction.channelId;
      else if(!channelId) return null;

      const cachedChannel = guild.channels.cache.get(channelId);
      if(cachedChannel) return cachedChannel;

      return await guild.channels.fetch(channelId);
    } catch(error) {
      console.error(error);
      this.replyError('Ha ocurrido un error al obtener este canal.');

      return null;
    }
  }
}
