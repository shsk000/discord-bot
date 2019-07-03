import { Client, Message } from "discord.js";
import MessageParse from "../Usecases/MessageParse";

export default class OnMessage {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  triggerEventListener(): void {
    this.client.on("message", (m: Message) => {
      try {
        const p = new MessageParse(m);
        const parsed = p.parsedMessage();

        if (parsed.mensionTarget !== "bot-test") return;

        if (parsed.isInvalidBotOrder)
          m.channel.send("invalid command arguments");
      } catch (e) {
        m.channel.send(e.stack);
      }
    });
  }
}
