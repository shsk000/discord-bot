import { Client, Message } from "discord.js";
import { AbstractOnController } from ".";
import { logger } from "../Foundation/logger";
import {
  createMessageParseService,
  MessageParseService,
} from "../Usecases/MessageParseService/MessageParse";
import {
  createSearchImagesService,
  SearchImagesService,
} from "../Usecases/SearchImageService/SearchImages";
import { createStopValheimServerService } from "../Usecases/Valheim/StopValheimServerService";

class OnMessage extends AbstractOnController {
  public MessageParseService: MessageParseService;
  public SearchImagesService: SearchImagesService;

  constructor(
    client: Client,
    MessageParseService: MessageParseService,
    SearchImagesService: SearchImagesService
  ) {
    super(client);
    this.MessageParseService = MessageParseService;
    this.SearchImagesService = SearchImagesService;
  }

  triggerEventListener(): void {
    this.client.on("message", async (m: Message) => {
      try {
        // split into foundation
        const parsed = this.MessageParseService.parse(m);

        logger.debug("OnMessage parsed message | ", parsed);

        if (parsed.mensionTarget !== "bot-test") return;

        if (parsed.isInvalidBotOrder) {
          m.channel.send("invalid command arguments");
          return;
        }

        if (parsed.command === "img") {
          const result = await this.SearchImagesService.search(
            parsed.messageText
          );
          m.reply(result);
        }

        // if (parsed.command === "startValheim") {
        //   //
        // }

        if (parsed.command === "stopValheim") {
          await createStopValheimServerService().execute();
        }
      } catch (e) {
        m.channel.send(e.stack);
      }
    });
  }
}

export const createOnMessageController = (client: Client): OnMessage => {
  const MessageParseService = createMessageParseService();
  const SearchImagesService = createSearchImagesService();

  return new OnMessage(client, MessageParseService, SearchImagesService);
};
