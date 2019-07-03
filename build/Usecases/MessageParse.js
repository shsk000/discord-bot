"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = __importDefault(require("../Entities/Message"));
class MessageParse {
    constructor(m) {
        this.discordMessage = new Message_1.default(m);
    }
    parsedMessage() {
        const mensionTarget = this.discordMessage.getMensitionTarget();
        const command = this.discordMessage.getCommand();
        const messageText = this.discordMessage.getMessageText();
        const isInvalidBotOrder = this.discordMessage.isInvalidBotOrder();
        return {
            mensionTarget,
            command,
            messageText,
            isInvalidBotOrder
        };
    }
}
exports.default = MessageParse;
//# sourceMappingURL=MessageParse.js.map