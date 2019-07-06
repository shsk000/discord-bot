"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_config_1 = __importDefault(require("../lib/inversify.config"));
class OnMessage {
    constructor(client) {
        this.client = client;
    }
    triggerEventListener() {
        this.client.on("message", async (m) => {
            try {
                const messageParse = inversify_config_1.default.get("IMessageParse");
                const parsed = messageParse.parsedMessage(m);
                if (parsed.mensionTarget !== "bot-test")
                    return;
                if (parsed.isInvalidBotOrder) {
                    m.channel.send("invalid command arguments");
                    return;
                }
                if (parsed.command === "img") {
                    const searchImages = inversify_config_1.default.get("ISearchImages");
                    const result = await searchImages.search(parsed.messageText);
                    m.reply(result.data.items[0].link);
                }
            }
            catch (e) {
                m.channel.send(e.stack);
            }
        });
    }
}
exports.default = OnMessage;
//# sourceMappingURL=OnMessage.js.map