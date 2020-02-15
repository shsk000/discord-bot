import { Client } from "discord.js";

export abstract class AbstractOnController {
  protected client: Client;

  public constructor(client: Client) {
    this.client = client;
  }

  public abstract triggerEventListener(): void;
}
