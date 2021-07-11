import { Message } from "discord.js";

export interface IDiscordMessage {
  parse(m: Message): void;
  getMensitionTarget(): string;
  getCommand(): string;
  getMessageText(): string;
  isInvalidBotOrder(): boolean;
}

class DiscordMessage implements IDiscordMessage {
  private mensionTarget: string;
  private command: string;
  private messageText: string;

  constructor() {
    this.mensionTarget = "";
    this.command = "";
    this.messageText = "";
  }

  public parse(m: Message): void {
    const parsed = m.content.match(/^(<@!?\d+>)\s?([^\s]*)\s?(.*)?/);

    if (!parsed || !(parsed instanceof Array)) return;

    const mensionTargetUsername = m.mentions.users.first()?.username;

    this.mensionTarget = mensionTargetUsername || "";
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
