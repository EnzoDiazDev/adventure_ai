if(process.env.NODE_ENV !== 'production') require('dotenv').config();

class Main {
  public static main():void {
    console.info('Hello world!');
  }
}

Main.main();
