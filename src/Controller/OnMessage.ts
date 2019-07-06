import { Client, Message } from "discord.js";
import { IMessageParse } from "../Usecases/MessageParse";
import { ISearchImages } from "../Usecases/SearchImages";

import container from "../lib/inversify.config";

export default class OnMessage {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  triggerEventListener(): void {
    this.client.on("message", async (m: Message) => {
      try {
        const messageParse = container.get<IMessageParse>("IMessageParse");
        const parsed = messageParse.parsedMessage(m);

        if (parsed.mensionTarget !== "bot-test") return;

        if (parsed.isInvalidBotOrder) {
          m.channel.send("invalid command arguments");
          return;
        }

        if (parsed.command === "img") {
          const searchImages = container.get<ISearchImages>("ISearchImages");
          const result = await searchImages.search(parsed.messageText);
          m.reply(result.data.items[0].link);
        }
      } catch (e) {
        m.channel.send(e.stack);
      }
    });
  }
}
