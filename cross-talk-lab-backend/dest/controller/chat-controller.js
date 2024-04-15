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
        const chat = await app_datasource_1.chatRepository.findOne({
            where: { id: chatId },
            relations: { messages: true }
        });
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
        const reply = await chainer.answerQuestion(question, vectorStores);
        const questionMessage = new message_1.Message();
        questionMessage.type = "sent";
        questionMessage.content = question;
        const answerMessage = new message_1.Message();
        answerMessage.type = "received";
        answerMessage.content = reply;
        chat.messages = chat.messages || [];
        chat.messages.push(questionMessage, answerMessage);
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