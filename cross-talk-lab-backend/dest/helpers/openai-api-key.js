"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeOpenAiApiKey = exports.setOpenAiApiKey = void 0;
const app_datasource_1 = require("../models/app-datasource");
const setting_1 = require("../models/setting");
const DEFAULT_API_KEY = "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";
async function setOpenAiApiKey() {
    let apiKeySetting = await app_datasource_1.settingRepository.findOneBy({ key: 'OPENAI_API_KEY' });
    if (!apiKeySetting) {
        apiKeySetting = new setting_1.Setting();
        apiKeySetting.key = "OPENAI_API_KEY";
        apiKeySetting.value = DEFAULT_API_KEY;
        app_datasource_1.settingRepository.save(apiKeySetting);
    }
    process.env.OPENAI_API_KEY = apiKeySetting.value;
}
exports.setOpenAiApiKey = setOpenAiApiKey;
async function changeOpenAiApiKey(newKey) {
    const apiKeySetting = await app_datasource_1.settingRepository.findOneBy({ key: 'OPENAI_API_KEY' });
    apiKeySetting.value = newKey;
    app_datasource_1.settingRepository.save(apiKeySetting);
    process.env.OPENAI_API_KEY = apiKeySetting.value;
}
exports.changeOpenAiApiKey = changeOpenAiApiKey;
//# sourceMappingURL=openai-api-key.js.map