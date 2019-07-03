"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
// import customSearch from "./customSearch.js";
const OnMessage_1 = __importDefault(require("./Controller/OnMessage"));
const client = new discord_js_1.default.Client();
client.on("ready", () => {
    console.log("ready...");
});
const onMessage = new OnMessage_1.default(client);
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
//# sourceMappingURL=app.js.map