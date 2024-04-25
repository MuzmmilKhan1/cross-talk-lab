import { Request, Response } from "express";
import { settingRepository } from "../models/app-datasource";
import { changeOpenAiApiKey, changeOpenAiModel } from "../helpers/openai-api-key";

interface IOpenAISettings {
    apiKey: string,
    model: string,
}

interface IRole {
    role: string
}

export class SettingsController {

    public async getOpenaiSettings(req: Request, res: Response) {
        const settings = await settingRepository.find({
            where: [
                { key: 'OPENAI_API_KEY' },
                { key: 'OPENAI_MODEL' }
            ]
        });

        const result: IOpenAISettings = {
            apiKey: '',
            model: ''
        };

        for (const setting of settings) {
            if (setting.key === 'OPENAI_API_KEY') result.apiKey = setting.value;
            else if (setting.key === 'OPENAI_MODEL') result.model = setting.value;
        }

        res.json(result);
    }

    public async setOpenaiSettings(req: Request, res: Response) {
        const settings = req.body as IOpenAISettings;
        await Promise.all([
            changeOpenAiApiKey(settings.apiKey),
            changeOpenAiModel(settings.model)
        ]);
        
        res.json({ success: true });
    }

    public async getChatbotRole(req: Request, res: Response) {
        const roleSetting = await settingRepository.findOneBy({ key: 'CHATBOT_ROLE' });
        res.json({
            role: roleSetting.value
        });
    }

    public async setChatbotRole(req: Request, res: Response) {
        const { role } = req.body as IRole;
        const roleSetting = await settingRepository.findOneBy({ key: 'CHATBOT_ROLE' });
        roleSetting.value = role;
        await settingRepository.save(roleSetting);
        console.log(roleSetting);
        res.json({ success: true });
    }

}