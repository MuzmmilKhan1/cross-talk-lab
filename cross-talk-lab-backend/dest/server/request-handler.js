"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestHandler = void 0;
const server_1 = require("./server");
const scrape_controller_1 = require("../controller/scrape-controller");
const error_controller_1 = require("../controller/error-controller");
const chat_controller_1 = require("../controller/chat-controller");
const statistics_controller_1 = require("../controller/statistics-controller");
const upload_controller_1 = require("../controller/upload-controller");
class RequestHandler extends server_1.Server {
    constructor() {
        super();
        this.route();
        this.start();
    }
    route() {
        const scrapeController = new scrape_controller_1.ScrapeController();
        this.app.post("/scrape", scrapeController.scrape.bind(scrapeController));
        this.app.get("/scrape-history", scrapeController.scrapeHistory.bind(scrapeController));
        const chatController = new chat_controller_1.ChatController();
        this.app.get("/chats", chatController.index.bind(chatController));
        this.app.get("/chats/:id", chatController.read.bind(chatController));
        this.app.post("/chats", chatController.create.bind(chatController));
        this.app.put("/chats/:id", chatController.update.bind(chatController));
        this.app.delete("/chats/:id", chatController.delete.bind(chatController));
        this.app.post("/search-similar", chatController.searchSimilar.bind(chatController));
        this.app.post("/answer-question", chatController.answer.bind(chatController));
        const statisticsController = new statistics_controller_1.StatisticsController();
        this.app.get("/statistics", statisticsController.getAll.bind(statisticsController));
        const uploadController = new upload_controller_1.UploadController();
        this.app.post("/save-file", uploadController.saveFile.bind(uploadController));
        const errorController = new error_controller_1.ErrorController();
        this.app.use(errorController.notFound.bind(errorController));
        this.app.use(errorController.exception.bind(errorController));
    }
}
exports.RequestHandler = RequestHandler;
//# sourceMappingURL=request-handler.js.map