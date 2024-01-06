import * as Discord from 'discord.js';

import InteractionUtil from './InteractionUtil';

export default class InteractionUtils extends InteractionUtil {
  public isChatInputCommand():boolean {
    return this.interaction.isChatInputCommand();
  }

  public async requireGuild():Promise<null|Discord.Guild> {
    try {
      const guild = await this.getGuild();
      if(!guild) {
        this.replyError('Debes estar en un servidor para usar este comando.');

        return null;
      }

      return guild;
    } catch(error) {
      console.error(error);
      this.replyError('Ha ocurrido un error al validar si estás en el servidor.');

      return null;
    }
  }

  public async requireChannel(channelId:string):Promise<null|Discord.GuildBasedChannel> {
    try {
      const channel = await this.getChannel(channelId);
      if(!channel) {
        this.replyError(`Debes estar en el canal <#${channelId}> para usar este comando.`);

        return null;
      }

      return channel;
    } catch(error) {
      console.error(error);
      this.replyError(`Ha ocurrido un error al validar si estás en el canal <#${channelId}>.`);

      return null;
    }
  }

  public async requireRole(roleId:string):Promise<null|Discord.Role> {
    try {
      const role = await this.getRole(roleId);
      if(!role) {
        this.replyError('No existe el rol dedicado en este servidor.');

        return null;
      }

      return role;
    } catch(error) {
      console.error(error);
      this.replyError('Ha ocurrido un error al validar si existe un rol dedicado en este servidor.');

      return null;
    }
  }

  public async requireMember(memberId?:string):Promise<null|Discord.GuildMember> {
    try {
      const member = await this.getMember(memberId);
      if(!member) {
        this.replyError('Este usuario no está en el servidor.');

        return null;
      }

      return member;
    } catch(error) {
      console.error(error);
      this.replyError('Ha ocurrido un error al validar a un usuario.');

      return null;
    }
  }
}
