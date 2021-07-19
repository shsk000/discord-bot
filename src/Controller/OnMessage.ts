import { Client, Message } from "discord.js";
import { AbstractOnController } from ".";
import { isTextChannel } from "../Foundation/isTextChannel";
import { logger } from "../Foundation/logger";
import {
  createMessageParseService,
  MessageParseService,
} from "../Usecases/MessageParseService/MessageParse";
import {
  createSearchImagesService,
  SearchImagesService,
} from "../Usecases/SearchImageService/SearchImages";
import {
  createFetchServerDetailsService,
  FetchServerDetailsService,
} from "../Usecases/Valheim/FetchServerDetailsService";
import {
  createStartValheimServerService,
  StartValheimServerService,
} from "../Usecases/Valheim/StartValheimServerService";
import {
  createStopValheimServerService,
  StopValheimServerService,
} from "../Usecases/Valheim/StopValheimServerService";

class OnMessage extends AbstractOnController {
  private readonly messageParseService: MessageParseService;
  private readonly searchImagesService: SearchImagesService;
  private readonly stopValheimServerService: StopValheimServerService;
  private readonly startValheimServerService: StartValheimServerService;
  private readonly fetchServerDetailsService: FetchServerDetailsService;

  constructor(
    client: Client,
    messageParseService: MessageParseService,
    searchImagesService: SearchImagesService,
    stopValheimServerService: StopValheimServerService,
    startValheimServerService: StartValheimServerService,
    fetchServerDetailsService: FetchServerDetailsService
  ) {
    super(client);
    this.messageParseService = messageParseService;
    this.searchImagesService = searchImagesService;
    this.stopValheimServerService = stopValheimServerService;
    this.startValheimServerService = startValheimServerService;
    this.fetchServerDetailsService = fetchServerDetailsService;
  }

  triggerEventListener(): void {
    this.client.on("message", async (m: Message) => {
      try {
        const message = this.messageParseService.parse(m);

        logger.debug("OnMessage parsed message | ", message);

        if (message.mensionTarget !== process.env.DISCORD_OWN_BOT_NAME) return;

        if (message.isInvalidBotOrder) {
          await m.channel.send("invalid command arguments");
          return;
        }

        if (message.command === "img") {
          const result = await this.searchImagesService.search(
            message.messageText
          );
          await m.reply(result);
        }

        if (message.command === "server" && message.messageText === "stop") {
          const { result } = await this.stopValheimServerService.execute();
          if (result) {
            await m.reply("Server has been shut down.");
          } else {
            await m.reply("Server shut down process failed.");
          }
        }

        if (message.command === "server" && message.messageText === "start") {
          const { result } = await this.startValheimServerService.execute();

          if (result) {
            await m.reply("Server is up and running.");
          } else {
            await m.reply("Server failed to start.");
          }
        }

        if (message.command === "server" && message.messageText === "details") {
          const details = await this.fetchServerDetailsService.execute();
          await m.reply(JSON.stringify(details.server));
        }
      } catch (e) {
        logger.error("OnMessage catch error | ", e);
        if (e instanceof Error) {
          const debugChannel = await this.client.channels.fetch(
            process.env.DEBUG_CHANNEL_ID
          );
          const errorMessage = `ErrorName: ${e.name}\nMessage: ${e.message}\nStack:\n${e.stack}`;

          if (debugChannel && isTextChannel(debugChannel)) {
            await debugChannel.send(errorMessage);
          }
        }
      }
    });
  }
}

export const createOnMessageController = (client: Client): OnMessage => {
  const messageParseService = createMessageParseService();
  const searchImagesService = createSearchImagesService();
  const stopValheimServerService = createStopValheimServerService();
  const startValheimServerService = createStartValheimServerService();
  const fetchServerDetailsService = createFetchServerDetailsService();

  return new OnMessage(
    client,
    messageParseService,
    searchImagesService,
    stopValheimServerService,
    startValheimServerService,
    fetchServerDetailsService
  );
};
