import { DataSource } from "typeorm"
import { ScrapeHistory } from "./scrape-history";
import { Chat } from "./chat";
import { Message } from "./message";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "data.db",
    entities: [ScrapeHistory, Chat, Message],
    synchronize: true,
});

export const scrapeHistoryRepository = AppDataSource.getRepository(ScrapeHistory);
export const chatRepository = AppDataSource.getRepository(Chat);
export const messageRepository = AppDataSource.getRepository(Message);