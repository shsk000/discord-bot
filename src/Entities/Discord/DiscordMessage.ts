import { Message } from "discord.js";

class DiscordMessage {
  private command: string;
  private messageText: string;

  constructor() {
    this.command = "";
    this.messageText = "";
  }

  public parse(m: Message): void {
    const parsed = m.content.match(/^==([^\s]*)\s?([^\s]*)\s?(.*)?/);

    if (!parsed || !(parsed instanceof Array)) return;

    this.command = parsed[1] || "";
    this.messageText = parsed[2] || "";
  }

  public getCommand(): string {
    return this.command;
  }

  public getMessageText(): string {
    return this.messageText;
  }

  public isInvalidBotOrder(): boolean {
    return this.command.length === 0 || this.messageText.length === 0;
  }
}

export default DiscordMessage;
