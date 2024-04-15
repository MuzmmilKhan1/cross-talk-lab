import { DataSource } from "typeorm"
import { ScrapeHistory } from "./scrape-history";
import { Chat } from "./chat";
import { Message } from "./message";
import { Setting } from "./setting";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "data.db",
    entities: [ScrapeHistory, Chat, Message, Setting],
    synchronize: true,
});

export const scrapeHistoryRepository = AppDataSource.getRepository(ScrapeHistory);
export const chatRepository = AppDataSource.getRepository(Chat);
export const messageRepository = AppDataSource.getRepository(Message);
export const settingRepository = AppDataSource.getRepository(Setting);