import { Message } from "discord.js";
import DiscordMessage from "../Entities/DiscordMessage";

export interface IMessageParseUsecase {
  parsedMessage(m: Message): ParsedMessage;
}

type ParsedMessage = {
  mensionTarget: string;
  command: string;
  messageText: string;
  isInvalidBotOrder: boolean;
};

class MessageParseUsecase implements IMessageParseUsecase {
  public parsedMessage(m: Message): ParsedMessage {
    const discordMessage = new DiscordMessage();

    discordMessage.parse(m);

    const mensionTarget = discordMessage.getMensitionTarget();
    const command = discordMessage.getCommand();
    const messageText = discordMessage.getMessageText();
    const isInvalidBotOrder = discordMessage.isInvalidBotOrder();

    return {
      mensionTarget,
      command,
      messageText,
      isInvalidBotOrder,
    };
  }
}

export const createMessageParseUsecase = (): IMessageParseUsecase => {
  return new MessageParseUsecase();
};
