"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrapeController = void 0;
const scrapper_1 = require("../helpers/scrapper");
const vector_data_1 = require("../helpers/vector-data");
const uuid_1 = require("uuid");
const app_datasource_1 = require("../models/app-datasource");
const scrape_history_1 = require("../models/scrape-history");
class ScrapeController {
    async scrape(req, res, next) {
        try {
            const { url, name, followLinks } = req.body;
            const scrapper = new scrapper_1.Scrapper(url);
            let paragraphs = [];
            if (followLinks === "on")
                paragraphs = (await scrapper.getParagraphsRecursively(name)).flat();
            else
                paragraphs = await scrapper.getParagraphs(name);
            const id = (0, uuid_1.v4)();
            const path = `vector-database/${id}`;
            await vector_data_1.VectorData.make(paragraphs, path);
            const scrapeHistory = new scrape_history_1.ScrapeHistory();
            scrapeHistory.name = name;
            scrapeHistory.path = path;
            scrapeHistory.url = url;
            await app_datasource_1.scrapeHistoryRepository.save(scrapeHistory);
            res.json({ success: true });
        }
        catch (error) {
            next(error);
        }
    }
    async scrapeHistory(req, res) {
        const history = await app_datasource_1.scrapeHistoryRepository.find();
        res.json(history);
    }
}
exports.ScrapeController = ScrapeController;
//# sourceMappingURL=scrape-controller.js.map