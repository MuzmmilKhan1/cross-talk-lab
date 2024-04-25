"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsController = void 0;
const app_datasource_1 = require("../models/app-datasource");
const openai_api_key_1 = require("../helpers/openai-api-key");
class SettingsController {
    async getOpenaiSettings(req, res) {
        const settings = await app_datasource_1.settingRepository.find({
            where: [
                { key: 'OPENAI_API_KEY' },
                { key: 'OPENAI_MODEL' }
            ]
        });
        const result = {
            apiKey: '',
            model: ''
        };
        for (const setting of settings) {
            if (setting.key === 'OPENAI_API_KEY')
                result.apiKey = setting.value;
            else if (setting.key === 'OPENAI_MODEL')
                result.model = setting.value;
        }
        res.json(result);
    }
    async setOpenaiSettings(req, res) {
        const settings = req.body;
        await Promise.all([
            (0, openai_api_key_1.changeOpenAiApiKey)(settings.apiKey),
            (0, openai_api_key_1.changeOpenAiModel)(settings.model)
        ]);
        res.json({ success: true });
    }
    async getChatbotRole(req, res) {
        const roleSetting = await app_datasource_1.settingRepository.findOneBy({ key: 'CHATBOT_ROLE' });
        res.json({
            role: roleSetting.value
        });
    }
    async setChatbotRole(req, res) {
        const { role } = req.body;
        const roleSetting = await app_datasource_1.settingRepository.findOneBy({ key: 'CHATBOT_ROLE' });
        roleSetting.value = role;
        await app_datasource_1.settingRepository.save(roleSetting);
        console.log(roleSetting);
        res.json({ success: true });
    }
}
exports.SettingsController = SettingsController;
//# sourceMappingURL=settings-controller.js.map