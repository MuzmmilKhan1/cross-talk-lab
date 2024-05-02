"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsController = void 0;
const app_datasource_1 = require("../models/app-datasource");
class LogsController {
    async index(req, res) {
        const error_logs = await app_datasource_1.errorLogsRepository.find();
        res.json(error_logs);
    }
}
exports.LogsController = LogsController;
//# sourceMappingURL=logs-controller.js.map