"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileReader = void 0;
const path_1 = require("path");
const promises_1 = __importDefault(require("fs/promises"));
const mammoth_1 = __importDefault(require("mammoth"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
class FileReader {
    prepareResult(text) {
        return text
            .split("\n")
            .map(txt => txt.trim())
            .filter(txt => txt !== "");
    }
    async readTxt(path) {
        const content = await promises_1.default.readFile(path);
        return this.prepareResult(content.toString());
    }
    async readDocx(path) {
        const buffer = await promises_1.default.readFile(path);
        const result = await mammoth_1.default.extractRawText({ buffer });
        return this.prepareResult(result.value);
    }
    async readPdf(path) {
        const buffer = await promises_1.default.readFile(path);
        const data = await (0, pdf_parse_1.default)(buffer);
        return this.prepareResult(data.text);
    }
    async read(path, extension) {
        extension = extension || (0, path_1.extname)(path).toLowerCase();
        switch (extension) {
            case ".txt":
                return this.readTxt(path);
            case ".docx":
                return this.readDocx(path);
            case ".pdf":
                return this.readPdf(path);
            default:
                return [];
        }
    }
}
exports.FileReader = FileReader;
//# sourceMappingURL=file-reader.js.map