import { JSDOM } from "jsdom";

export class Scrapper {
    constructor(
        public url: string
    ) { }

    private normalizeUrl(url: string) {
        return url[url.length - 1] === "/" ? url : url + "/";
    }

    public async getParagraphsRecursively() {
        const links: string[] = [
            this.normalizeUrl(this.url)
        ];
        const contents: string[][] = [];
        let cursor: number = 0;

        while (cursor < links.length) {
            const link = links[cursor];
            // console.log(link);
            const response = await fetch(link);
            const content = await response.text();
            const dom = new JSDOM(content);

            [...dom.window.document.getElementsByTagName("a")]
                .forEach(anchor => {
                    const href = anchor.href;
                    const resolvedLink = new URL(href, link);
                    resolvedLink.hash = "";
                    const newLink = this.normalizeUrl(resolvedLink.href);
                    if (
                        !links.includes(newLink) &&
                        newLink.startsWith("http") &&
                        new URL(this.url).origin === resolvedLink.origin
                    ) links.push(newLink);
                });

            const paragraphs = [
                ...dom.window.document.getElementsByTagName("p")
            ].map(paragraph => paragraph.textContent.trim()).filter(paragraph => paragraph !== "");

            contents.push(paragraphs);
            cursor++;
        }

        return contents;
    }

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
        ].map(paragraph => paragraph.textContent.trim()).filter(p => p !== "");
    }
}