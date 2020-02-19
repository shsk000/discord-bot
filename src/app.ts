import Discord, { TextChannel } from "discord.js";
// import ytdl from "ytdl-core";

declare const process: {
  env: {
    NODE_ENV: string;
    DISCORD_TOKEN: string;
    SERVER_ENV: string;
  };
};

import { OnMessage } from "./Controller/OnMessage";
import { OnVoiceStateUpdate } from "./Controller/OnVoiceStateUpdate";
import { DebugChannel } from "./Entities/Channel/DebugChannel";

const client = new Discord.Client();

client.on("ready", () => {
  // eslint-disable-next-line no-undef
  console.log("ready...");

  const channel = client.channels.get(new DebugChannel().id);

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

const onMessage = new OnMessage(client);
onMessage.triggerEventListener();

const onVoiceStateUpdate = new OnVoiceStateUpdate(client);
onVoiceStateUpdate.triggerEventListener();

client.login(process.env.DISCORD_TOKEN);
