import { JSDOM } from "jsdom";

export class Scrapper {
    constructor(
        public url: string
    ) {}

    public async getContent() {
        const response = await fetch(this.url);
        return await response.text();
    }

    public async getDOM() {
        const content = await this.getContent();
        return new JSDOM(content);
    }

    public async getParagraphs() {
        const dom = await this.getDOM();
        return [
            ...dom.window.document.querySelectorAll("p")
        ].map(paragraph => paragraph.textContent);
    }
}