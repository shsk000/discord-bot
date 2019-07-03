import { Message } from "discord.js";
import DiscordMessage, { IDiscordMessage } from "../Entities/Message";

interface IParsedMessage {
  mensionTarget: string;
  command: string;
  messageText: string;
  isInvalidBotOrder: boolean;
}

export default class MessageParse {
  private discordMessage: IDiscordMessage;

  constructor(m: Message) {
    this.discordMessage = new DiscordMessage(m);
  }

  public parsedMessage(): IParsedMessage {
    const mensionTarget = this.discordMessage.getMensitionTarget();
    const command = this.discordMessage.getCommand();
    const messageText = this.discordMessage.getMessageText();
    const isInvalidBotOrder = this.discordMessage.isInvalidBotOrder();

    return {
      mensionTarget,
      command,
      messageText,
      isInvalidBotOrder
    };
  }
}
