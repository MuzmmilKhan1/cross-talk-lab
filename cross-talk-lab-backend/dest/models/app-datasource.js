"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingRepository = exports.messageRepository = exports.chatRepository = exports.scrapeHistoryRepository = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const scrape_history_1 = require("./scrape-history");
const chat_1 = require("./chat");
const message_1 = require("./message");
const setting_1 = require("./setting");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "data.db",
    entities: [scrape_history_1.ScrapeHistory, chat_1.Chat, message_1.Message, setting_1.Setting],
    synchronize: true,
});
exports.scrapeHistoryRepository = exports.AppDataSource.getRepository(scrape_history_1.ScrapeHistory);
exports.chatRepository = exports.AppDataSource.getRepository(chat_1.Chat);
exports.messageRepository = exports.AppDataSource.getRepository(message_1.Message);
exports.settingRepository = exports.AppDataSource.getRepository(setting_1.Setting);
//# sourceMappingURL=app-datasource.js.map