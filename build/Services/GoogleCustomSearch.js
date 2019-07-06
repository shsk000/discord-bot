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
var GoogleCustomSearch_1;
Object.defineProperty(exports, "__esModule", { value: true });
"use strict";
const googleapis_1 = require("googleapis");
const inversify_1 = require("inversify");
const customSearch = googleapis_1.google.customsearch("v1");
let GoogleCustomSearch = GoogleCustomSearch_1 = class GoogleCustomSearch {
    constructor() { }
    async search(q) {
        const start = Math.floor(Math.random() * 20);
        return await customSearch.cse.list({
            cx: GoogleCustomSearch_1.CSE_ID,
            q,
            auth: GoogleCustomSearch_1.API_KEY,
            searchType: "image",
            safe: "high",
            num: 1,
            start
        });
    }
};
GoogleCustomSearch.API_KEY = process.env.GOOGLE_API_KEY;
GoogleCustomSearch.CSE_ID = process.env.GOOGLE_CSE_ID;
GoogleCustomSearch = GoogleCustomSearch_1 = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], GoogleCustomSearch);
exports.default = GoogleCustomSearch;
//# sourceMappingURL=GoogleCustomSearch.js.map