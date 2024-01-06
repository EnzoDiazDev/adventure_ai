import Session from './Session';

export default class Game {
  /** igual al guild id */
  public readonly id:string;
  public readonly roleId:string;
  public readonly session:Session;

  constructor(id:string, roleId:string, session:Session) {
    this.id = id;
    this.roleId = roleId;
    this.session = session;
  }
}
