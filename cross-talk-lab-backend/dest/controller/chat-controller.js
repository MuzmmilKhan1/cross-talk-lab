"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const app_datasource_1 = require("../models/app-datasource");
const chat_1 = require("../models/chat");
const vector_data_1 = require("../helpers/vector-data");
const chainer_1 = require("../helpers/chainer");
const message_1 = require("../models/message");
class ChatController {
    async index(req, res) {
        const chats = await app_datasource_1.chatRepository.find();
        res.json(chats);
    }
    async create(req, res) {
        const { name, vectorDataPath } = req.body;
        const chat = new chat_1.Chat();
        chat.name = name;
        chat.vectorDataPath = vectorDataPath;
        await app_datasource_1.chatRepository.save(chat);
        res.json({ success: true, id: chat.id });
    }
    async read(req, res) {
        const id = parseInt(req.params.id);
        const chat = await app_datasource_1.chatRepository.findOne({
            where: { id },
            relations: { messages: true }
        });
        chat.messages = chat.messages.filter(m => m.type !== "context");
        res.json(chat);
    }
    async update(req, res) {
    }
    async delete(req, res) {
        const id = parseInt(req.params.id);
        await app_datasource_1.chatRepository.delete({ id });
        res.json({ success: true });
    }
    async answer(req, res) {
        const body = req.body;
        const chatId = parseInt(body.chatId);
        const question = body.question;
        const chatbotRole = (await app_datasource_1.settingRepository.findOneBy({ key: 'CHATBOT_ROLE' })).value;
        const chat = await app_datasource_1.chatRepository.findOne({
            where: { id: chatId },
            relations: { messages: true }
        });
        // const messageHistory: GPTMessage[] = chat.messages.map(m => [
        //     m.type === 'sent' ? 'user' : 
        //     m.type === 'context' ? 'system' :
        //     'assistant',
        //     `${m.type === "context" ? "Context: " : ""}${m.content}`
        // ]);
        const messageHistory = [
            ['system', "Here is the Context retrived from vector database, you have to answer from it: \n{context}\n"]
        ];
        for (const message of chat.messages) {
            if (message.type === "context")
                messageHistory[0][1] += message.content + "\n";
            else if (message.type === "received")
                messageHistory.push(["assistant", message.content]);
            else if (message.type === "sent")
                messageHistory.push(["user", message.content]);
        }
        const vectorDataPath = chat.vectorDataPath;
        let vectorStores = [];
        if (vectorDataPath) {
            const vectorData = await vector_data_1.VectorData.load(vectorDataPath);
            vectorStores.push(vectorData.vectorStore);
        }
        else {
            const scrapeHistory = await app_datasource_1.scrapeHistoryRepository.find();
            const vectorStoresP = scrapeHistory.map(async (single) => {
                const vd = await vector_data_1.VectorData.load(single.path);
                return vd.vectorStore;
            });
            vectorStores = await Promise.all(vectorStoresP);
        }
        const chainer = new chainer_1.Chainer();
        const { retrivedContext, reply } = await chainer.answerQuestion(question, vectorStores, messageHistory, chatbotRole);
        const contextMessage = new message_1.Message();
        contextMessage.type = "context";
        contextMessage.content = retrivedContext;
        const questionMessage = new message_1.Message();
        questionMessage.type = "sent";
        questionMessage.content = question;
        const answerMessage = new message_1.Message();
        answerMessage.type = "received";
        answerMessage.content = reply;
        chat.messages = chat.messages || [];
        chat.messages.push(contextMessage, questionMessage, answerMessage);
        await app_datasource_1.chatRepository.save(chat);
        res.json({ success: true, answer: reply });
    }
    async searchSimilar(req, res) {
        const question = req.body.question;
        const vectorDataPath = req.body.vectorDataPath;
        const vectorData = await vector_data_1.VectorData.load(vectorDataPath);
        const result = await vectorData.searchSimilar(question);
        res.json(result);
    }
}
exports.ChatController = ChatController;
//# sourceMappingURL=chat-controller.js.map