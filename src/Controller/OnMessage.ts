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
        // split into foundation
        const parsed = this.messageParseService.parse(m);

        logger.debug("OnMessage parsed message | ", parsed);

        if (parsed.mensionTarget !== "bot-test") return;

        if (parsed.isInvalidBotOrder) {
          m.channel.send("invalid command arguments");
          return;
        }

        if (parsed.command === "img") {
          const result = await this.searchImagesService.search(
            parsed.messageText
          );
          m.reply(result);
        }

        if (parsed.command === "server" && parsed.messageText === "stop") {
          const { result } = await this.stopValheimServerService.execute();
          if (result) {
            m.reply("Server has been shut down.");
          } else {
            m.reply("Server shut down process failed.");
          }
        }

        if (parsed.command === "server" && parsed.messageText === "start") {
          const { result } = await this.startValheimServerService.execute();

          if (result) {
            m.reply("Server is up and running.");
          } else {
            m.reply("Server failed to start.");
          }
        }

        if (parsed.command === "server" && parsed.messageText === "details") {
          const details = await this.fetchServerDetailsService.execute();

          m.reply(JSON.stringify(details.server));
        }
      } catch (e) {
        logger.error("OnMessage catch error | ", e);
        if (e instanceof Error) {
          const errorMessage = `${e.name}\n${e.message}\n${e.stack}`;
          m.channel.send(errorMessage);
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
