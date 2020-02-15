import Discord from "discord.js";
// import ytdl from "ytdl-core";

declare const process: {
  env: {
    NODE_ENV: string;
    DISCORD_TOKEN: string;
  };
};

import { OnMessage } from "./Controller/OnMessage";
import { OnVoiceStateUpdate } from "./Controller/OnVoiceStateUpdate";

const client = new Discord.Client();

client.on("ready", () => {
  // eslint-disable-next-line no-undef
  console.log("ready...");
});

const onMessage = new OnMessage(client);
onMessage.triggerEventListener();

const onVoiceStateUpdate = new OnVoiceStateUpdate(client);
onVoiceStateUpdate.triggerEventListener();

client.login(process.env.DISCORD_TOKEN);
