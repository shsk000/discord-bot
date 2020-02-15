import { Message } from "discord.js";
import { IDiscordMessage } from "../Entities/DiscordMessage";
import { inject, injectable } from "inversify";

export interface IMessageParse {
  parsedMessage(m: Message): ParsedMessage;
}

type ParsedMessage = {
  mensionTarget: string;
  command: string;
  messageText: string;
  isInvalidBotOrder: boolean;
};

@injectable()
export class MessageParse implements IMessageParse {
  private discordMessage: IDiscordMessage;

  constructor(@inject("IDiscordMessage") discordMessage: IDiscordMessage) {
    this.discordMessage = discordMessage;
  }

  public parsedMessage(m: Message): ParsedMessage {
    this.discordMessage.parse(m);

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
