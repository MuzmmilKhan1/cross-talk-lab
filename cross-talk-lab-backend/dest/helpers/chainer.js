"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chainer = void 0;
const openai_1 = require("@langchain/openai");
const prompts_1 = require("@langchain/core/prompts");
const output_parsers_1 = require("@langchain/core/output_parsers");
const runnables_1 = require("@langchain/core/runnables");
class Chainer {
    async answerQuestion(question, vectorStores, messageHistory, chatbotRole) {
        let messages = [
            ["system", chatbotRole],
            ...messageHistory,
            // [
            //     "system",
            //     "Context:\n{context}",
            // ],
            ["user", "{question}"],
        ];
        // console.log(messages);
        const prompt = prompts_1.ChatPromptTemplate.fromMessages(messages);
        const chatModel = new openai_1.ChatOpenAI({});
        const outputParser = new output_parsers_1.StringOutputParser();
        let retrivedContext = "";
        const retrievers = vectorStores.map(vs => vs.asRetriever(1));
        const contextRetrieval = new runnables_1.RunnableLambda({
            func: async (input) => {
                const contexts = await Promise.all(retrievers.map(retriever => retriever.invoke(input)));
                retrivedContext = contexts
                    .map(res => res.map(sing => sing.pageContent).join("\n"))
                    .join("\n\n");
                console.log(retrivedContext);
                return retrivedContext;
            },
        }).withConfig({ runName: "contextRetriever" });
        const setupAndRetrieval = runnables_1.RunnableMap.from({
            context: contextRetrieval,
            question: new runnables_1.RunnablePassthrough(),
        });
        const chain = setupAndRetrieval.pipe(prompt).pipe(chatModel).pipe(outputParser);
        const reply = await chain.invoke(question);
        return { retrivedContext, reply };
    }
}
exports.Chainer = Chainer;
//# sourceMappingURL=chainer.js.map