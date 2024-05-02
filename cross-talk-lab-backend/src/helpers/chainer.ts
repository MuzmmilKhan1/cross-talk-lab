import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
    RunnableLambda,
    RunnableMap,
    RunnablePassthrough,
} from "@langchain/core/runnables";
import { VectorStore } from "langchain/vectorstores/base";

export type GPTMessage = ["system" | "user" | "assistant", string];

export class Chainer {

    public async answerQuestion(question: string, vectorStores: VectorStore[], messageHistory: GPTMessage[], chatbotRole: string) {
        let messages: GPTMessage[] = [
            ["system", chatbotRole],
            ...messageHistory,
            // [
            //     "system",
            //     "Context:\n{context}",
            // ],
            ["user", "{question}"],
        ];
        // console.log(messages);
        const prompt = ChatPromptTemplate.fromMessages(messages);
        const chatModel = new ChatOpenAI({});
        const outputParser = new StringOutputParser();

        let retrivedContext: string = "";
        const retrievers = vectorStores.map(vs => vs.asRetriever(1));
        const contextRetrieval = new RunnableLambda({
            func: async (input: string) => {
                const contexts = await Promise.all(
                    retrievers.map(retriever => retriever.invoke(input))
                );
                retrivedContext = contexts
                    .map(res => res.map(sing => sing.pageContent).join("\n"))
                    .join("\n\n");
                console.log(retrivedContext)
                return retrivedContext;
            },
        }).withConfig({ runName: "contextRetriever" });

        const setupAndRetrieval = RunnableMap.from({
            context: contextRetrieval,
            question: new RunnablePassthrough(),
        });

        const chain = setupAndRetrieval.pipe(prompt).pipe(chatModel).pipe(outputParser);

        const reply = await chain.invoke(question);

        return { retrivedContext, reply };
    }

}