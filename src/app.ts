import Discord from "discord.js";

declare const process: {
  env: {
    NODE_ENV: string;
    DISCORD_TOKEN: string;
  };
};

import OnMessage from "./Controller/OnMessage";

const client = new Discord.Client();

client.on("ready", () => {
  // eslint-disable-next-line no-undef
  console.log("ready...");
});

const onMessage = new OnMessage(client);
onMessage.triggerEventListener();

client.login(process.env.DISCORD_TOKEN);
