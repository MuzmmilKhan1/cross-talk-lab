import { settingRepository } from "../models/app-datasource";
import { Setting } from "../models/setting";

const DEFAULT_API_KEY = "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";

export async function setOpenAiApiKey() {
    let apiKeySetting = await settingRepository.findOneBy({ key: 'OPENAI_API_KEY' });

    if (!apiKeySetting) {
        apiKeySetting = new Setting();
        apiKeySetting.key = "OPENAI_API_KEY";
        apiKeySetting.value = DEFAULT_API_KEY;
        await settingRepository.save(apiKeySetting);
    }
    
    process.env.OPENAI_API_KEY = apiKeySetting.value;
}

export async function changeOpenAiApiKey(newKey: string) {
    const apiKeySetting = await settingRepository.findOneBy({ key: 'OPENAI_API_KEY' });
    apiKeySetting.value = newKey;
    await settingRepository.save(apiKeySetting);
    process.env.OPENAI_API_KEY = apiKeySetting.value;
}

export async function changeOpenAiModel(model: string) {
    let modelSetting = await settingRepository.findOneBy({ key: 'OPENAI_MODEL' }) ;

    if (!modelSetting) {
        modelSetting = new Setting();
        modelSetting.key = 'OPENAI_MODEL';
    }

    modelSetting.value = model;
    await settingRepository.save(modelSetting);
}