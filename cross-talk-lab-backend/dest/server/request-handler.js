"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestHandler = void 0;
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const server_1 = require("./server");
const scrape_controller_1 = require("../controller/scrape-controller");
const error_controller_1 = require("../controller/error-controller");
const chat_controller_1 = require("../controller/chat-controller");
const statistics_controller_1 = require("../controller/statistics-controller");
const upload_controller_1 = require("../controller/upload-controller");
const settings_controller_1 = require("../controller/settings-controller");
class RequestHandler extends server_1.Server {
    constructor() {
        super();
        this.route();
        this.start();
    }
    route() {
        const router = express_1.default.Router();
        const scrapeController = new scrape_controller_1.ScrapeController();
        router.post("/scrape", scrapeController.scrape.bind(scrapeController));
        router.get("/scrape-history", scrapeController.scrapeHistory.bind(scrapeController));
        const chatController = new chat_controller_1.ChatController();
        router.get("/chats", chatController.index.bind(chatController));
        router.get("/chats/:id", chatController.read.bind(chatController));
        router.post("/chats", chatController.create.bind(chatController));
        router.put("/chats/:id", chatController.update.bind(chatController));
        router.delete("/chats/:id", chatController.delete.bind(chatController));
        router.post("/search-similar", chatController.searchSimilar.bind(chatController));
        router.post("/answer-question", chatController.answer.bind(chatController));
        const statisticsController = new statistics_controller_1.StatisticsController();
        router.get("/statistics", statisticsController.getAll.bind(statisticsController));
        const uploadController = new upload_controller_1.UploadController();
        router.post("/save-file", uploadController.saveFile.bind(uploadController));
        const settingsController = new settings_controller_1.SettingsController();
        router.get("/openai-settings", settingsController.getOpenaiSettings.bind(settingsController));
        router.post("/openai-settings", settingsController.setOpenaiSettings.bind(settingsController));
        const errorController = new error_controller_1.ErrorController();
        router.use(errorController.notFound.bind(errorController));
        router.use(errorController.exception.bind(errorController));
        this.app.use("/api", router);
        const publicPath = path_1.default.resolve("../cross-talk-lab-frontend/dist");
        const indexFile = path_1.default.resolve("../cross-talk-lab-frontend/dist/index.html");
        this.app.use(express_1.default.static(publicPath));
        this.app.use((req, res) => res.sendFile(indexFile));
    }
}
exports.RequestHandler = RequestHandler;
//# sourceMappingURL=request-handler.js.map