"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scrapper = void 0;
const jsdom_1 = require("jsdom");
class Scrapper {
    url;
    constructor(url) {
        this.url = url;
    }
    normalizeUrl(url) {
        return url[url.length - 1] === "/" ? url : url + "/";
    }
    async getParagraphsRecursively() {
        const links = [
            this.normalizeUrl(this.url)
        ];
        const contents = [];
        let cursor = 0;
        while (cursor < links.length) {
            const link = links[cursor];
            const response = await fetch(link);
            const content = await response.text();
            const dom = new jsdom_1.JSDOM(content);
            [...dom.window.document.getElementsByTagName("a")]
                .forEach(anchor => {
                const href = anchor.href;
                const resolvedLink = new URL(href, link);
                resolvedLink.hash = "";
                const newLink = this.normalizeUrl(resolvedLink.href);
                if (!links.includes(newLink) &&
                    newLink.startsWith("http") &&
                    new URL(this.url).origin === resolvedLink.origin)
                    links.push(newLink);
            });
            const paragraphs = [
                ...dom.window.document.querySelectorAll("p, ul")
            ].map(paragraph => paragraph.textContent.trim()).filter(paragraph => paragraph !== "");
            contents.push(paragraphs);
            cursor++;
        }
        return contents;
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
        const paragraphs = [
            ...dom.window.document.querySelectorAll("p, ul")
        ].map(paragraph => paragraph.textContent.trim()).filter(p => p !== "");
        return paragraphs;
    }
}
exports.Scrapper = Scrapper;
//# sourceMappingURL=scrapper.js.map