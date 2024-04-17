import fsp from 'fs/promises';
import { createWorker, Worker } from 'tesseract.js';

export class ImageText {
    private static worker?: Worker;

    public static async instantiate() {
        if (!ImageText.worker) ImageText.worker = await createWorker('eng');
        return new ImageText();
    }

    public async extractParagraphs(path: string) {
        const file = await fsp.readFile(path);
        const result = await ImageText.worker.recognize(file);
        return result.data.paragraphs.map(paragraph => paragraph.text);
    }
}