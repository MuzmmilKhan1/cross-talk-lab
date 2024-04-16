import { DataSource } from "typeorm"
import { ScrapeHistory } from "./scrape-history";
import { Chat } from "./chat";
import { Message } from "./message";
import { Setting } from "./setting";
import { User } from "./user";
import { Session } from "./session";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "data.db",
    entities: [ScrapeHistory, Chat, Message, Setting, User, Session],
    synchronize: true,
});

export const scrapeHistoryRepository = AppDataSource.getRepository(ScrapeHistory);
export const chatRepository = AppDataSource.getRepository(Chat);
export const messageRepository = AppDataSource.getRepository(Message);
export const settingRepository = AppDataSource.getRepository(Setting);
export const userRepository = AppDataSource.getRepository(User);
export const sessionRepository = AppDataSource.getRepository(Session);