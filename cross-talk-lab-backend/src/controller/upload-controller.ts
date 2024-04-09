import fsp from "fs/promises";
import { extname } from "path";
import { Request, Response } from "express";
import formidable from "formidable";
import { v4 as uuid } from "uuid";
import { FileReader } from "../helpers/file-reader";
import { VectorData } from "../helpers/vector-data";
import { scrapeHistoryRepository } from "../models/app-datasource";
import { ScrapeHistory } from "../models/scrape-history";

export class UploadController {

    public async saveFile(req: Request, res: Response) {
        const [fields, files] = await formidable({ multiples: false }).parse(req);

        const name = fields.name[0];
        const { filepath, originalFilename } = files.file[0];
        const extension = extname(originalFilename);

        const texts = await new FileReader().read(filepath, extension);
        const id = uuid();
        const path = `vector-database/${id}`;
        await VectorData.make(texts, path);

        const scrapeHistory = new ScrapeHistory();
        scrapeHistory.name = name;
        scrapeHistory.path = path;
        scrapeHistory.url = "";
        await scrapeHistoryRepository.save(scrapeHistory);

        await fsp.rm(filepath);

        res.json({ success: true });
    }

}