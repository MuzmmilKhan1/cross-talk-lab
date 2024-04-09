"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scrapper = void 0;
const jsdom_1 = require("jsdom");
class Scrapper {
    url;
    constructor(url) {
        this.url = url;
    }
    async getContent() {
        const response = await fetch(this.url);
        return await response.text();
    }
    async getDOM() {
        const content = await this.getContent();
        return new jsdom_1.JSDOM(content);
    }
    async getParagraphs() {
        const dom = await this.getDOM();
        return [
            ...dom.window.document.querySelectorAll("p")
        ].map(paragraph => paragraph.textContent);
    }
}
exports.Scrapper = Scrapper;
//# sourceMappingURL=scrapper.js.map