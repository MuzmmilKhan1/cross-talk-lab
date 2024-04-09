import { NextFunction, Request, Response } from "express";
import { chatRepository } from "../models/app-datasource";
import { Chat } from "../models/chat";
import { VectorData } from "../helpers/vector-data";
import { Chainer } from "../helpers/chainer";
import { Message } from "../models/message";

interface IAnswer {
    chatId: string,
    question: string
}

interface ICreate {
    name: string,
    vectorDataPath: string
}

export class ChatController {

    public async index(req: Request, res: Response) {
        const chats = await chatRepository.find();
        res.json(chats);
    }

    public async create(req: Request, res: Response) {
        const { name, vectorDataPath } = req.body as ICreate;

        const chat = new Chat();
        chat.name = name;
        chat.vectorDataPath = vectorDataPath;
        await chatRepository.save(chat);

        res.json({ success: true, id: chat.id });
    }

    public async read(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const chat = await chatRepository.findOne({
            where: { id },
            relations: { messages: true }
        });
        res.json(chat);
    }

    public async update(req: Request, res: Response) {

    }

    public async delete(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        await chatRepository.delete({ id });
        res.json({ success: true });
    }

    public async answer(req: Request, res: Response) {
        const body = req.body as IAnswer;
        const chatId = parseInt(body.chatId);
        const question = body.question;

        const chat = await chatRepository.findOne({
            where: { id: chatId },
            relations: { messages: true }
        });
        const vectorDataPath = chat.vectorDataPath;
        const vectorData = await VectorData.load(vectorDataPath);

        const chainer = new Chainer();
        const reply = await chainer.answerQuestion(question, vectorData.vectorStore);

        const questionMessage = new Message();
        questionMessage.type = "sent";
        questionMessage.content = question;
        const answerMessage = new Message();
        answerMessage.type = "received";
        answerMessage.content = reply;
        chat.messages = chat.messages || [];
        chat.messages.push(questionMessage, answerMessage);
        await chatRepository.save(chat);

        res.json({ success: true, answer: reply });
    }

    public async searchSimilar(req: Request, res: Response) {
        const question = req.body.question as string;
        const vectorDataPath = req.body.vectorDataPath as string;

        const vectorData = await VectorData.load(vectorDataPath);
        const result = await vectorData.searchSimilar(question);

        res.json(result);
    }
}