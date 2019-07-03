import Discord from "discord.js";

declare const process: {
  env: {
    NODE_ENV: string;
    DISCORD_TOKEN: string;
  };
};

// import customSearch from "./customSearch.js";

import OnMessage from "./Controller/OnMessage";

const client = new Discord.Client();

client.on("ready", () => {
  console.log("ready...");
});

const onMessage = new OnMessage(client);
onMessage.triggerEventListener();

// client.on("message", async message => {
//   try {
//     const user = message.mentions.users.first();

//     if (message.author.bot || !user || user.username !== "bot-test") {
//       return;
//     }

//     const text = message.content.replace(/^<@!?\d+>/, "");

//     const result = await customSearch(text);
//     message.reply(result.data.items[0].link);
//   } catch (e) {
//     console.log(e);
//   }
// });

client.login(process.env.DISCORD_TOKEN);
