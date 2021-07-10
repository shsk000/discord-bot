import Discord, { TextChannel } from "discord.js";
import { createOnMessageController } from "./Controller/OnMessage";
import { DebugChannel } from "./Entities/Channel/DebugChannel";

declare const process: {
  env: {
    NODE_ENV: string;
    DISCORD_TOKEN: string;
    SERVER_ENV: string;
  };
};

const client = new Discord.Client();

client.on("ready", async () => {
  // eslint-disable-next-line no-undef
  console.log("ready...");

  const channel = await client.channels.fetch(new DebugChannel().id);

  const isTextChannel = (
    textChannel: Discord.Channel
  ): textChannel is TextChannel => {
    return textChannel.type === "text";
  };

  if (channel && isTextChannel(channel)) {
    channel.send(
      `bot server ready. env: ${process.env.NODE_ENV}, server: ${process.env.SERVER_ENV}`
    );
  }
});

const onMessage = createOnMessageController(client);
onMessage.triggerEventListener();

client.login(process.env.DISCORD_TOKEN);
