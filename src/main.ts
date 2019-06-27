import Discord from "discord.js";
import customSearch from "./customSearch";
import Message from "./Entities/Message";

const client = new Discord.Client();

client.on("ready", () => {
  console.log("ready...");
});

client.on("message", async message => {
  const m = new Message(message);
  console.log(m.getMensitionTarget());

  // try {
  //     const user = message.mentions.users.first();

  //     if (message.author.bot || !user || user.username !== "bot-test") {
  //         return;
  //     }

  //     const text = message.content.replace(/^<@!?\d+>/, "");

  //     const result = await customSearch(text);
  //     message.reply(result.data.items[0].link);
  // } catch(e) {
  //     console.log(e);
  // }
});

// client.login(process.env.DISCORD_TOKEN)
