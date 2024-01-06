import Player from './Player';

export default class Session {
  /** igual al channel id */
  public readonly id:string;
  public readonly name:string;
  public readonly description:string;
  public readonly players = new Map<string, Player>();

  constructor(id:string, name:string, description:string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  public addPlayer(player:Player) {
    this.players.set(player.id, player);
  }
}
