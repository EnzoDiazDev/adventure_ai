if(process.env.NODE_ENV !== 'production') require('dotenv').config();
import AdventureAi from './discord/AdventureAi';

class Main {
  public static async main():Promise<void> {
    console.info('Iniciando programa...');

    const app = new AdventureAi({
      intents: ['MessageContent', 'Guilds', 'GuildMessages', 'GuildMembers', 'GuildMessageReactions']
    });

    await app.start(process.env.DISCORD_BOT_TOKEN);

    console.info('Programa iniciado.');
  }
}

Main.main();
