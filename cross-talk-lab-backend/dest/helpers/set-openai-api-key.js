"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setOpenAiApiKey = void 0;
const app_datasource_1 = require("../models/app-datasource");
const setting_1 = require("../models/setting");
const DEFAULT_API_KEY = "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";
async function setOpenAiApiKey() {
    let apiKeySetting;
    apiKeySetting = await app_datasource_1.settingRepository.findOneBy({ key: 'OPENAI_API_KEY' });
    if (!apiKeySetting) {
        apiKeySetting = new setting_1.Setting();
        apiKeySetting.key = "OPENAI_API_KEY";
        apiKeySetting.value = DEFAULT_API_KEY;
    }
    const apiKey = apiKeySetting.value;
    if (!apiKey) {
        apiKeySetting;
        const defaultApiKey = "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";
        apiKey = defaultApiKey;
    }
    process.env.OPENAI_API_KEY = apiKey;
}
exports.setOpenAiApiKey = setOpenAiApiKey;
//# sourceMappingURL=set-openai-api-key.js.map