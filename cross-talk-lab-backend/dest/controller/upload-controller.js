"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = require("path");
const formidable_1 = __importDefault(require("formidable"));
const uuid_1 = require("uuid");
const file_reader_1 = require("../helpers/file-reader");
const vector_data_1 = require("../helpers/vector-data");
const app_datasource_1 = require("../models/app-datasource");
const scrape_history_1 = require("../models/scrape-history");
class UploadController {
    async saveFile(req, res) {
        const [fields, files] = await (0, formidable_1.default)({ multiples: false }).parse(req);
        const name = fields.name[0];
        const { filepath, originalFilename } = files.file[0];
        const extension = (0, path_1.extname)(originalFilename);
        const texts = await new file_reader_1.FileReader().read(filepath, extension);
        const id = (0, uuid_1.v4)();
        const path = `vector-database/${id}`;
        await vector_data_1.VectorData.make(texts, path);
        const scrapeHistory = new scrape_history_1.ScrapeHistory();
        scrapeHistory.name = name;
        scrapeHistory.path = path;
        scrapeHistory.url = "";
        await app_datasource_1.scrapeHistoryRepository.save(scrapeHistory);
        await promises_1.default.rm(filepath);
        res.json({ success: true });
    }
}
exports.UploadController = UploadController;
//# sourceMappingURL=upload-controller.js.map