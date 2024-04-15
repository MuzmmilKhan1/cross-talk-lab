import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
    RunnableLambda,
    RunnableMap,
    RunnablePassthrough,
} from "@langchain/core/runnables";
import { VectorStore } from "langchain/vectorstores/base";

export class Chainer {

    // public async answerQuestion(question: string, vectorStore: VectorStore) {
    //     const prompt = ChatPromptTemplate.fromMessages([
    //         [
    //             "ai",
    //             "Answer the question based on only the following context:\n{context}",
    //         ],
    //         ["human", "{question}"],
    //     ]);
    //     const chatModel = new ChatOpenAI({});
    //     const outputParser = new StringOutputParser();

    //     const retriever = vectorStore.asRetriever(1);
    //     const setupAndRetrieval = RunnableMap.from({
    //         context: new RunnableLambda({
    //             func: async (input: string) => {
    //                 const res = await retriever.invoke(input);
    //                 return res.map(sing => sing.pageContent).join("\n")
    //             },
    //         }).withConfig({ runName: "contextRetriever" }),
    //         question: new RunnablePassthrough(),
    //     });

    //     const chain = setupAndRetrieval.pipe(prompt).pipe(chatModel).pipe(outputParser);

    //     return await chain.invoke(question);
    // }

    public async answerQuestion(question: string, vectorStores: VectorStore[]) {
        const prompt = ChatPromptTemplate.fromMessages([
            [
                "ai",
                "Answer the question based on only the following context:\n{context}",
            ],
            ["human", "{question}"],
        ]);
        const chatModel = new ChatOpenAI({});
        const outputParser = new StringOutputParser();

        const retrievers = vectorStores.map(vs => vs.asRetriever(1));  // Create a retriever for each VectorStore
        const contextRetrieval = new RunnableLambda({
            func: async (input: string) => {
                const contexts = await Promise.all(
                    retrievers.map(retriever => retriever.invoke(input))
                );
                return contexts
                    .map(res => res.map(sing => sing.pageContent).join("\n"))
                    .join("\n\n");  // Separate contexts from different stores with a double newline
            },
        }).withConfig({ runName: "contextRetriever" });

        const setupAndRetrieval = RunnableMap.from({
            context: contextRetrieval,
            question: new RunnablePassthrough(),
        });

        const chain = setupAndRetrieval.pipe(prompt).pipe(chatModel).pipe(outputParser);

        return await chain.invoke(question);
    }

}