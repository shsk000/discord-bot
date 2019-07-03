"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DiscordMessage {
    constructor(m) {
        this.m = m;
        this.mensionTarget = "";
        this.command = "";
        this.messageText = "";
        this.parse();
    }
    parse() {
        const parsed = this.m.content.match(/^(<@!?\d+>)\s?([^\s]*)\s?(.*)?/);
        if (!parsed || !(parsed instanceof Array))
            return;
        this.mensionTarget = this.m.mentions.users.first().username;
        this.command = parsed[2] || "";
        this.messageText = parsed[3] || "";
    }
    getMensitionTarget() {
        return this.mensionTarget;
    }
    getCommand() {
        return this.command;
    }
    getMessageText() {
        return this.messageText;
    }
    isInvalidBotOrder() {
        return (this.mensionTarget.length === 0 ||
            this.command.length === 0 ||
            this.messageText.length === 0);
    }
}
exports.default = DiscordMessage;
//# sourceMappingURL=Message.js.map