"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chainer = void 0;
const openai_1 = require("@langchain/openai");
const prompts_1 = require("@langchain/core/prompts");
const output_parsers_1 = require("@langchain/core/output_parsers");
const runnables_1 = require("@langchain/core/runnables");
class Chainer {
    async answerQuestion(question, vectorStore) {
        const prompt = prompts_1.ChatPromptTemplate.fromMessages([
            [
                "ai",
                "Answer the question based on only the following context:\n{context}",
            ],
            ["human", "{question}"],
        ]);
        const chatModel = new openai_1.ChatOpenAI({});
        const outputParser = new output_parsers_1.StringOutputParser();
        const retriever = vectorStore.asRetriever(1);
        const setupAndRetrieval = runnables_1.RunnableMap.from({
            context: new runnables_1.RunnableLambda({
                func: async (input) => {
                    const res = await retriever.invoke(input);
                    return res.map(sing => sing.pageContent).join("\n");
                },
            }).withConfig({ runName: "contextRetriever" }),
            question: new runnables_1.RunnablePassthrough(),
        });
        const chain = setupAndRetrieval.pipe(prompt).pipe(chatModel).pipe(outputParser);
        return await chain.invoke(question);
    }
}
exports.Chainer = Chainer;
//# sourceMappingURL=chainer.js.map