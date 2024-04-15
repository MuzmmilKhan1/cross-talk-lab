import path from "path";
import express from "express";
import { Server } from "./server";
import { ScrapeController } from "../controller/scrape-controller";
import { ErrorController } from "../controller/error-controller";
import { ChatController } from "../controller/chat-controller";
import { StatisticsController } from "../controller/statistics-controller";
import { UploadController } from "../controller/upload-controller";
import { SettingsController } from "../controller/settings-controller";

export class RequestHandler extends Server {

    constructor() {
        super();
        this.route();
        this.start();
    }

    public route() {
        const router = express.Router();

        const scrapeController = new ScrapeController();
        router.post("/scrape", scrapeController.scrape.bind(scrapeController));
        router.get("/scrape-history", scrapeController.scrapeHistory.bind(scrapeController));

        const chatController = new ChatController();
        router.get("/chats", chatController.index.bind(chatController));
        router.get("/chats/:id", chatController.read.bind(chatController));
        router.post("/chats", chatController.create.bind(chatController));
        router.put("/chats/:id", chatController.update.bind(chatController));
        router.delete("/chats/:id", chatController.delete.bind(chatController));
        router.post("/search-similar", chatController.searchSimilar.bind(chatController));
        router.post("/answer-question", chatController.answer.bind(chatController));

        const statisticsController = new StatisticsController();
        router.get("/statistics", statisticsController.getAll.bind(statisticsController));

        const uploadController = new UploadController();
        router.post("/save-file", uploadController.saveFile.bind(uploadController));

        const settingsController = new SettingsController();
        router.get("/openai-settings", settingsController.getOpenaiSettings.bind(settingsController));
        router.post("/openai-settings", settingsController.setOpenaiSettings.bind(settingsController));
        
        const errorController = new ErrorController();
        router.use(errorController.notFound.bind(errorController));
        router.use(errorController.exception.bind(errorController));

        this.app.use("/api", router);

        const publicPath = path.resolve("../cross-talk-lab-frontend/dist");
        const indexFile = path.resolve("../cross-talk-lab-frontend/dist/index.html");
        
        this.app.use( express.static(publicPath) );
        this.app.use((req, res) => res.sendFile(indexFile));
    }

}