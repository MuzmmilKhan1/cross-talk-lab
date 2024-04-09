import { OpenAIEmbeddings } from "@langchain/openai";
import { FaissStore } from "@langchain/community/vectorstores/faiss";

export class VectorData {

    public vectorStore: FaissStore;

    public static async make(texts: string[], savePath: string) {
        const instance = new VectorData();

        instance.vectorStore = await FaissStore.fromTexts(
            texts,
            texts.map((_, i) => ({ id: i })),
            new OpenAIEmbeddings()
        );
        await instance.vectorStore.save(savePath);

        return instance;
    }

    public static async load(path: string) {
        const instance = new VectorData();

        instance.vectorStore = await FaissStore.load(
            path,
            new OpenAIEmbeddings()
        );

        return instance;
    }

    public async searchSimilar(text: string) {
        return await this.vectorStore.similaritySearch(text);
    }

}