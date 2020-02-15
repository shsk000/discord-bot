import { Message } from "discord.js";
import { IMessageParseUsecase } from "../Usecases/MessageParseUsecase";
import { ISearchImagesUsecase } from "../Usecases/SearchImagesUsecase";

import container from "../lib/inversify.config";
import { AbstractOnController } from ".";

export class OnMessage extends AbstractOnController {
  triggerEventListener(): void {
    this.client.on("message", async (m: Message) => {
      try {
        const messageParseUsecase = container.get<IMessageParseUsecase>(
          "IMessageParseUsecase"
        );
        const parsed = messageParseUsecase.parsedMessage(m);

        if (parsed.mensionTarget !== "bot-test") return;

        if (parsed.isInvalidBotOrder) {
          m.channel.send("invalid command arguments");
          return;
        }

        if (parsed.command === "img") {
          const searchImagesUsecase = container.get<ISearchImagesUsecase>(
            "ISearchImagesUsecase"
          );
          const result = await searchImagesUsecase.search(parsed.messageText);
          m.reply(result.data.items[0].link);
        }
      } catch (e) {
        m.channel.send(e.stack);
      }
    });
  }
}
