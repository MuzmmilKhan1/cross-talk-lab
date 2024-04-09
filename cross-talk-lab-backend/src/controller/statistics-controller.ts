import { Request, Response } from "express";
import { chatRepository, scrapeHistoryRepository, messageRepository } from "../models/app-datasource";

export class StatisticsController {

    public async getAll(req: Request, res: Response) {
        res.json({
            scrappedPages: await scrapeHistoryRepository.count(),
            chats: await chatRepository.count(),
            questionsAsked: await messageRepository.count({ where: { type: 'sent' } })
        });
    }

}