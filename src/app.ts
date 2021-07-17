import Discord from "discord.js";
import { config } from "dotenv";
import path from "path";
import { createOnMessageController } from "./Controller/OnMessage";
import { isTextChannel } from "./Foundation/isTextChannel";
import { logger } from "./Foundation/logger";

config({
  path: path.resolve("/app/src/Env/.env"),
});

const client = new Discord.Client();

client.on("ready", async () => {
  logger.debug("ready...");

  const channel = await client.channels.fetch(process.env.DEBUG_CHANNEL_ID);

  if (channel && isTextChannel(channel)) {
    channel.send(
      `bot server ready. env: ${process.env.NODE_ENV}, server: ${process.env.SERVER_ENV}`
    );
  }
});

const onMessage = createOnMessageController(client);
onMessage.triggerEventListener();

client.login(process.env.DISCORD_TOKEN);
