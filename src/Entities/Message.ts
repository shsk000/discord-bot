import { Message } from "discord.js";

export interface IDiscordMessage {
  getMensitionTarget(): string;
  getCommand(): string;
  getMessageText(): string;
  isInvalidBotOrder(): boolean;
}

class DiscordMessage implements IDiscordMessage {
  private m: Message;
  private mensionTarget: string;
  private command: string;
  private messageText: string;

  constructor(m: Message) {
    this.m = m;
    this.mensionTarget = "";
    this.command = "";
    this.messageText = "";

    this.parse();
  }

  private parse(): void {
    const parsed = this.m.content.match(/^(<@!?\d+>)\s?([^\s]*)\s?(.*)?/);

    if (!parsed || !(parsed instanceof Array)) return;

    this.mensionTarget = this.m.mentions.users.first().username;
    this.command = parsed[2] || "";
    this.messageText = parsed[3] || "";
  }

  public getMensitionTarget(): string {
    return this.mensionTarget;
  }

  public getCommand(): string {
    return this.command;
  }

  public getMessageText(): string {
    return this.messageText;
  }

  public isInvalidBotOrder(): boolean {
    return (
      this.mensionTarget.length === 0 ||
      this.command.length === 0 ||
      this.messageText.length === 0
    );
  }
}

export default DiscordMessage;
