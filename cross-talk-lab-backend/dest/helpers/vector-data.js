"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorData = void 0;
const openai_1 = require("@langchain/openai");
const faiss_1 = require("@langchain/community/vectorstores/faiss");
class VectorData {
    vectorStore;
    static async make(texts, savePath) {
        const instance = new VectorData();
        instance.vectorStore = await faiss_1.FaissStore.fromTexts(texts, texts.map((_, i) => ({ id: i })), new openai_1.OpenAIEmbeddings());
        await instance.vectorStore.save(savePath);
        return instance;
    }
    static async load(path) {
        const instance = new VectorData();
        instance.vectorStore = await faiss_1.FaissStore.load(path, new openai_1.OpenAIEmbeddings());
        return instance;
    }
    async searchSimilar(text) {
        return await this.vectorStore.similaritySearch(text);
    }
}
exports.VectorData = VectorData;
//# sourceMappingURL=vector-data.js.map