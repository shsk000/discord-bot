"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
let DiscordMessage = class DiscordMessage {
    constructor() {
        this.mensionTarget = "";
        this.command = "";
        this.messageText = "";
    }
    parse(m) {
        const parsed = m.content.match(/^(<@!?\d+>)\s?([^\s]*)\s?(.*)?/);
        if (!parsed || !(parsed instanceof Array))
            return;
        this.mensionTarget = m.mentions.users.first().username;
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
};
DiscordMessage = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], DiscordMessage);
exports.default = DiscordMessage;
//# sourceMappingURL=Message.js.map