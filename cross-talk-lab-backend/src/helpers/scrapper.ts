import { JSDOM } from "jsdom";

export class Scrapper {
    constructor(
        public url: string
    ) { }

    public async getParagraphsRecursively() {
        const links: string[] = [
            this.url
        ];
        const contents: string[][] = [];
        let cursor: number = 0;
        while (cursor < links.length) {
            const link = links[cursor];
            console.log("Fetching " + link);
            const response = await fetch(link);
            const content = await response.text();
            const dom = new JSDOM(content);

            if(cursor === 0){
                [...dom.window.document.querySelectorAll("a")]
                .forEach(anchor => {
                    const href = anchor.href;
                    const resolvedLink = new URL(href, link);
                    resolvedLink.hash = "";
                    const newLink = resolvedLink.href;
                    if (
                        !links.includes(newLink) &&
                        newLink.startsWith("http") 
                    ) links.push(newLink);
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

    public async getContent() {
        console.log(this.url);
        const response = await fetch(this.url);
        return await response.text();
    }

    public async getDOM() {
        const content = await this.getContent();
        return new JSDOM(content);
    }

    public async getParagraphs() {
        const dom = await this.getDOM();
        const paragraphs = [
            ...dom.window.document.querySelectorAll("p, ul, ol, a")
        ].map(paragraph => paragraph.textContent.trim()).filter(p => p !== "");
        return paragraphs;
    }
}

// Checks either the URL is from the same website: line no 34
//  && new URL(this.url).origin === resolvedLink.origin