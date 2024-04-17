import { extname } from "path";
import fsp from "fs/promises";
import mammoth from "mammoth";
import pdf from "pdf-parse";
import { ImageText } from "./image-text";

export class FileReader {

    private prepareResult(text: string) {
        return text
            .split("\n")
            .map(txt => txt.trim())
            .filter(txt => txt !== "");
    }

    public async readTxt(path: string): Promise<string[]> {
        const content = await fsp.readFile(path);
        return this.prepareResult(content.toString());
    }

    public async readDocx(path: string): Promise<string[]> {
        const buffer = await fsp.readFile(path);
        const result = await mammoth.extractRawText({ buffer });
        return this.prepareResult(result.value);
    }

    public async readPdf(path: string): Promise<string[]> {
        const buffer = await fsp.readFile(path);
        const data = await pdf(buffer);
        return this.prepareResult(data.text);
    }

    private async readImage(path: string): Promise<string[]> {
        const imageText = await ImageText.instantiate();
        return await imageText.extractParagraphs(path);
    }

    public async read(path: string, extension?: string): Promise<string[]> {
        extension = extension || extname(path);
        extension = extension.toLowerCase();

        switch (extension) {
            case ".txt":
                return this.readTxt(path);
            case ".docx":
                return this.readDocx(path);
            case ".pdf":
                return this.readPdf(path);
            case ".bmp":
            case ".jpg":
            case ".png":
            case ".pbm":
            case ".webp":
                return this.readImage(path);
            default:
                return [];
        }
    }
}