import { Message } from "discord.js";

interface IDiscordMessage {
  getMensitionTarget(): string;
}

class DiscordMessage implements IDiscordMessage {
  m: Message;

  constructor(m: Message) {
    this.m = m;
  }

  public getMensitionTarget(): string {
    return this.m.mentions.users.first().username;
  }
}

export default DiscordMessage;
