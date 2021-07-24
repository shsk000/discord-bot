import { Message } from "discord.js";
import DiscordMessage from "./DiscordMessage";

describe("DiscordMessage.ts", () => {
  test.each([
    ["==server start", "server", "start"],
    ["===server start", "=server", "start"],
    ["abcd", "", ""],
    ["", "", ""],
  ])("parsed message, %s", (content, command, text) => {
    const MessageMock = {
      content: content,
    } as Message;

    const discordMessage = new DiscordMessage();

    discordMessage.parse(MessageMock);

    expect(discordMessage.getCommand()).toBe(command);
    expect(discordMessage.getMessageText()).toBe(text);
  });
});
