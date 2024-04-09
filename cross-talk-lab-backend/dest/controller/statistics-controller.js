"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsController = void 0;
const app_datasource_1 = require("../models/app-datasource");
class StatisticsController {
    async getAll(req, res) {
        res.json({
            scrappedPages: await app_datasource_1.scrapeHistoryRepository.count(),
            chats: await app_datasource_1.chatRepository.count(),
            questionsAsked: await app_datasource_1.messageRepository.count({ where: { type: 'sent' } })
        });
    }
}
exports.StatisticsController = StatisticsController;
//# sourceMappingURL=statistics-controller.js.map