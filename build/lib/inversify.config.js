"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
// entity
const Message_1 = __importDefault(require("../Entities/Message"));
// service
const GoogleCustomSearch_1 = __importDefault(require("../Services/GoogleCustomSearch"));
// usecase
const SearchImages_1 = __importDefault(require("../Usecases/SearchImages"));
const MessageParse_1 = __importDefault(require("../Usecases/MessageParse"));
const myContainer = new inversify_1.Container();
// bind entity
myContainer.bind("IDiscordMessage").to(Message_1.default);
// bind service
myContainer
    .bind("IGoogleCustomSearch")
    .to(GoogleCustomSearch_1.default);
// bind usecase
myContainer.bind("ISearchImages").to(SearchImages_1.default);
myContainer.bind("IMessageParse").to(MessageParse_1.default);
exports.default = myContainer;
//# sourceMappingURL=inversify.config.js.map