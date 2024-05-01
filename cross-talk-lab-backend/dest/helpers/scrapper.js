"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scrapper = void 0;
const jsdom_1 = require("jsdom");
class Scrapper {
    url;
    constructor(url) {
        this.url = url;
    }
    async getParagraphsRecursively() {
        const links = [
            this.url
        ];
        const contents = [];
        let cursor = 0;
        while (cursor < links.length) {
            const link = links[cursor];
            console.log("Fetching " + link);
            const response = await fetch(link);
            const content = await response.text();
            const dom = new jsdom_1.JSDOM(content);
            if (cursor === 0) {
                [...dom.window.document.querySelectorAll("a")]
                    .forEach(anchor => {
                    const href = anchor.href;
                    const resolvedLink = new URL(href, link);
                    resolvedLink.hash = "";
                    const newLink = resolvedLink.href;
                    if (!links.includes(newLink) &&
                        newLink.startsWith("http"))
                        links.push(newLink);
                });
            }
            const paragraphs = [
                ...dom.window.document.querySelectorAll("p, ul, ol, a")
            ].map(paragraph => paragraph.textContent.trim()).filter(paragraph => paragraph !== "");
            paragraphs.unshift('source/link/cite/citation: ' + link + 'Information: ');
            contents.push(paragraphs);
            cursor++;
        }
        return contents;
    }
    async getContent() {
        console.log(this.url);
        const response = await fetch(this.url);
        return await response.text();
    }
    async getDOM() {
        const content = await this.getContent();
        return new jsdom_1.JSDOM(content);
    }
    async getParagraphs() {
        const dom = await this.getDOM();
        const paragraphs = [
            ...dom.window.document.querySelectorAll("p, ul, ol, a")
        ].map(paragraph => paragraph.textContent.trim()).filter(p => p !== "");
        return paragraphs;
    }
}
exports.Scrapper = Scrapper;
// Checks either the URL is from the same website: line no 34
//  && new URL(this.url).origin === resolvedLink.origin
//# sourceMappingURL=scrapper.js.map