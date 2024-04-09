import { Server } from "./server";
import { ScrapeController } from "../controller/scrape-controller";
import { ErrorController } from "../controller/error-controller";
import { ChatController } from "../controller/chat-controller";
import { StatisticsController } from "../controller/statistics-controller";
import { UploadController } from "../controller/upload-controller";

export class RequestHandler extends Server {

    constructor() {
        super();
        this.route();
        this.start();
    }

    public route() {
        const scrapeController = new ScrapeController();
        this.app.post("/scrape", scrapeController.scrape.bind(scrapeController));
        this.app.get("/scrape-history", scrapeController.scrapeHistory.bind(scrapeController));

        const chatController = new ChatController();
        this.app.get("/chats", chatController.index.bind(chatController));
        this.app.get("/chats/:id", chatController.read.bind(chatController));
        this.app.post("/chats", chatController.create.bind(chatController));
        this.app.put("/chats/:id", chatController.update.bind(chatController));
        this.app.delete("/chats/:id", chatController.delete.bind(chatController));
        this.app.post("/search-similar", chatController.searchSimilar.bind(chatController));
        this.app.post("/answer-question", chatController.answer.bind(chatController));

        const statisticsController = new StatisticsController();
        this.app.get("/statistics", statisticsController.getAll.bind(statisticsController));

        const uploadController = new UploadController();
        this.app.post("/save-file", uploadController.saveFile.bind(uploadController));
        
        const errorController = new ErrorController();
        this.app.use(errorController.notFound.bind(errorController));
        this.app.use(errorController.exception.bind(errorController));
    }

}