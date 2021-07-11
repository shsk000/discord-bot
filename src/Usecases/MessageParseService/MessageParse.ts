import { Message } from "discord.js";
import DiscordMessage from "../../Entities/Discord/DiscordMessage";
import { ParsedMessageOutput } from "./ParsedMessageOutput";

export interface MessageParseService {
  parse(m: Message): ParsedMessageOutput;
}

class MessageParseServiceImpl implements MessageParseService {
  public parse(m: Message): ParsedMessageOutput {
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

export const createMessageParseService = (): MessageParseService => {
  return new MessageParseServiceImpl();
};
