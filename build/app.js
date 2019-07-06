"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
const OnMessage_1 = __importDefault(require("./Controller/OnMessage"));
const client = new discord_js_1.default.Client();
client.on("ready", () => {
    console.log("ready...");
});
const onMessage = new OnMessage_1.default(client);
onMessage.triggerEventListener();
client.login(process.env.DISCORD_TOKEN);
//# sourceMappingURL=app.js.map