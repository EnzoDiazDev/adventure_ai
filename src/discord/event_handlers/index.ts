import OnInteractionCreate from './OnInteractionCreate';
import OnReady from './OnReady';

/** */
export default class EventHandlers {
  public readonly onInteractionCreate = new OnInteractionCreate();
  public readonly onReady = new OnReady();
}
