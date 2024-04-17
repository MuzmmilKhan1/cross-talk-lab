"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageText = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const tesseract_js_1 = require("tesseract.js");
class ImageText {
    static worker;
    static async instantiate() {
        if (!ImageText.worker)
            ImageText.worker = await (0, tesseract_js_1.createWorker)('eng');
        return new ImageText();
    }
    async extractParagraphs(path) {
        const file = await promises_1.default.readFile(path);
        const result = await ImageText.worker.recognize(file);
        return result.data.paragraphs.map(paragraph => paragraph.text);
    }
}
exports.ImageText = ImageText;
//# sourceMappingURL=image-text.js.map