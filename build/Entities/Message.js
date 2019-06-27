"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DiscordMessage = /** @class */ (function () {
    function DiscordMessage(m) {
        this.m = m;
    }
    DiscordMessage.prototype.getMensitionTarget = function () {
        return this.m.mentions.users.first().username;
    };
    return DiscordMessage;
}());
exports.default = DiscordMessage;
