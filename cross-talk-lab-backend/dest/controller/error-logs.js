"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrapeController = void 0;
const app_datasource_1 = require("../models/app-datasource");
class ScrapeController {
    async index(req, res) {
        const error_logs = app_datasource_1.errorLogsRepository.find();
        res.json(error_logs);
    }
}
exports.ScrapeController = ScrapeController;
//# sourceMappingURL=error-logs.js.map