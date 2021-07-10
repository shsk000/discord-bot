import { Client, Message } from "discord.js";
import { AbstractOnController } from ".";
import {
  createMessageParseUsecase,
  IMessageParseUsecase,
} from "../Usecases/MessageParse";
import {
  createSearchImagesUsecase,
  ISearchImagesUsecase,
} from "../Usecases/SearchImages";

class OnMessage extends AbstractOnController {
  public messageParseUsecase: IMessageParseUsecase;
  public searchImagesUsecase: ISearchImagesUsecase;

  constructor(
    client: Client,
    messageParseUsecase: IMessageParseUsecase,
    searchImagesUsecase: ISearchImagesUsecase
  ) {
    super(client);
    this.messageParseUsecase = messageParseUsecase;
    this.searchImagesUsecase = searchImagesUsecase;
  }

  triggerEventListener(): void {
    this.client.on("message", async (m: Message) => {
      try {
        // split into foundation
        const parsed = this.messageParseUsecase.parsedMessage(m);

        if (parsed.mensionTarget !== "bot-test") return;

        if (parsed.isInvalidBotOrder) {
          m.channel.send("invalid command arguments");
          return;
        }

        if (parsed.command === "img") {
          const result = await this.searchImagesUsecase.search(
            parsed.messageText
          );
          m.reply(result.data.items[0].link);
        }
      } catch (e) {
        m.channel.send(e.stack);
      }
    });
  }
}

export const createOnMessageController = (client: Client): OnMessage => {
  const messageParseUsecase = createMessageParseUsecase();
  const searchImagesUsecase = createSearchImagesUsecase();

  return new OnMessage(client, messageParseUsecase, searchImagesUsecase);
};
