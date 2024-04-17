import { NextFunction, Request, Response } from "express";
import { Scrapper } from "../helpers/scrapper";
import { VectorData } from "../helpers/vector-data";
import { v4 as uuid } from 'uuid';
import { scrapeHistoryRepository } from "../models/app-datasource";
import { ScrapeHistory } from "../models/scrape-history";

interface IScrape {
    url: string,
    name: string,
    followLinks?: string
}

export class ScrapeController {

    public async scrape(req: Request, res: Response, next: NextFunction) {
        try {
            const { url, name, followLinks } = req.body as IScrape;

            const scrapper = new Scrapper(url);
            let paragraphs: string[] = [];
            
            if (followLinks === "on")
                paragraphs = (await scrapper.getParagraphsRecursively()).flat()
            else
                paragraphs = await scrapper.getParagraphs();

            const id = uuid();
            const path = `vector-database/${id}`;
            await VectorData.make(paragraphs, path);

            const scrapeHistory = new ScrapeHistory();
            scrapeHistory.name = name;
            scrapeHistory.path = path;
            scrapeHistory.url = url;
            await scrapeHistoryRepository.save(scrapeHistory);

            res.json({ success: true });
        } catch (error) {
            next(error);
        }
    }

    public async scrapeHistory(req: Request, res: Response) {
        const history = await scrapeHistoryRepository.find();
        res.json(history);
    }

}