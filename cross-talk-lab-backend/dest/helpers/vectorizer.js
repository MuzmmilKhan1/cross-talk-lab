"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vectorizer = void 0;
const openai_1 = require("@langchain/openai");
const faiss_1 = require("@langchain/community/vectorstores/faiss");
class Vectorizer {
    async vectorize(texts) {
        const vectorStore = await faiss_1.FaissStore.fromTexts(["Hello world", "Bye bye", "hello nice world"], [{ id: 2 }, { id: 1 }, { id: 3 }], new openai_1.OpenAIEmbeddings());
        await vectorStore.save("vector-database");
        return vectorStore;
    }
}
exports.Vectorizer = Vectorizer;
