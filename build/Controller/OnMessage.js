"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageParse_1 = __importDefault(require("../Usecases/MessageParse"));
class OnMessage {
    constructor(client) {
        this.client = client;
    }
    triggerEventListener() {
        this.client.on("message", (m) => {
            try {
                const p = new MessageParse_1.default(m);
                const parsed = p.parsedMessage();
                console.log(parsed);
                if (parsed.mensionTarget !== "bot-test")
                    return;
                if (parsed.isInvalidBotOrder)
                    m.channel.send("invalid command arguments");
            }
            catch (e) {
                m.channel.send(e.stack);
            }
        });
    }
}
exports.default = OnMessage;
//# sourceMappingURL=OnMessage.js.map