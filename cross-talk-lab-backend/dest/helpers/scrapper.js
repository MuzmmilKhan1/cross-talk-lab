"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scrapper = void 0;
const jsdom_1 = require("jsdom");
const error_log_1 = require("../models/error-log");
const app_datasource_1 = require("../models/app-datasource");
class Scrapper {
    url;
    constructor(url) {
        this.url = url;
    }
    async getParagraphsRecursively(name) {
        const links = [
            this.url
        ];
        const contents = [];
        let cursor = 0;
        while (cursor < links.length) {
            try {
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
            }
            catch (error) {
                console.error("Error occurred in getParagraphs:", error);
                const error_log = new error_log_1.ErrorLogs();
                error_log.name = name;
                error_log.url = this.url;
                error_log.error_message = error.toString();
                await app_datasource_1.errorLogsRepository.save(error_log);
            }
            cursor++;
        }
        return contents;
    }
    async getContent() {
        try {
            console.log(this.url);
            const response = await fetch(this.url);
            return await response.text();
        }
        catch (error) {
            console.error("Error occurred in getContent:", error);
            throw error;
        }
    }
    async getDOM() {
        try {
            const content = await this.getContent();
            return new jsdom_1.JSDOM(content);
        }
        catch (error) {
            console.error("Error occurred in getDom:", error);
            throw error;
        }
    }
    async getParagraphs(name) {
        try {
            const dom = await this.getDOM();
            const paragraphs = [
                ...dom.window.document.querySelectorAll("p, ul, ol, a")
            ].map(paragraph => paragraph.textContent.trim()).filter(p => p !== "");
            return paragraphs;
        }
        catch (error) {
            console.error("Error occurred in getParagraphs:", error);
            const error_log = new error_log_1.ErrorLogs();
            error_log.name = name;
            error_log.url = this.url;
            error_log.error_message = error.toString();
            await app_datasource_1.errorLogsRepository.save(error_log);
            throw error;
        }
    }
}
exports.Scrapper = Scrapper;
// Checks either the URL is from the same website: line no 34
//  && new URL(this.url).origin === resolvedLink.origin
// import { JSDOM } from "jsdom";
// import { ErrorLogs } from "../models/error-log";
// import { errorLogsRepository } from "../models/app-datasource";
// export class Scrapper {
//     constructor(
//         public url: string
//     ) { }
//     public async getParagraphsRecursively(name) {
//         const links: string[] = [
//             this.url
//         ];
//         const contents: string[][] = [];
//         let cursor: number = 0;
//         while (cursor < links.length) {
//             try{
//                 const link = links[cursor];
//                 console.log("Fetching " + link);
//                 const response = await fetch(link);
//                 const content = await response.text();
//                 const dom = new JSDOM(content);
//                 if(cursor === 0){
//                 [...dom.window.document.querySelectorAll("a")]
//                 .forEach(anchor => {
//                     const href = anchor.href;
//                     const resolvedLink = new URL(href, link);
//                     resolvedLink.hash = "";
//                     const newLink = resolvedLink.href;
//                     if (
//                         !links.includes(newLink) &&
//                         newLink.startsWith("http") 
//                     ) links.push(newLink);
//                 });
//             }
//             const paragraphs = [
//                 ...dom.window.document.querySelectorAll("p, ul, ol, a")
//             ].map(paragraph => paragraph.textContent.trim()).filter(paragraph => paragraph !== "");
//             paragraphs.unshift('\n source/link/cite/citation: \n' + link + '\n Information: \n');
//             contents.push(paragraphs);
//             }catch(error){
//                 console.error("Error occurred in getParagraphs:", error);
//                 const error_log = new ErrorLogs();
//                 error_log.name = name;
//                 error_log.url = this.url;
//                 error_log.error_message = error.toString();
//                 await errorLogsRepository.save(error_log);
//             }
//             cursor++;
//         }
//         return contents;
//     }
//     public async getContent() {
//         try{
//             const response = await fetch(this.url);
//             return await response.text();
//         } catch (error) {
//             console.error("Error occurred in getContent:", error);
//             throw error;
//         }
//     }
//     public async getDOM() {
//         try{
//             const content = await this.getContent();
//             return new JSDOM(content);
//         } catch (error) {
//             console.error("Error occurred in getDom:", error);
//             throw error;
//         }
//     }
//     public async getParagraphs(name: string) {
//         try{
//             const dom = await this.getDOM();
//             const paragraphs = [
//                 ...dom.window.document.querySelectorAll("p, ul, ol, a")
//             ].map(paragraph => paragraph.textContent.trim()).filter(p => p !== "");
//             return paragraphs;
//         } catch (error) {
//             console.error("Error occurred in getParagraphs:", error);
//             const error_log = new ErrorLogs();
//             error_log.name = name;
//             error_log.url = this.url;
//             error_log.error_message = error.toString();
//             await errorLogsRepository.save(error_log);
//             throw error;
//         }
//     }
// }
//# sourceMappingURL=scrapper.js.map