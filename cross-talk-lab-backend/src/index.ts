import { setOpenAiApiKey } from "./helpers/openai-api-key";
import { AppDataSource, settingRepository } from "./models/app-datasource";
import { RequestHandler } from "./server/request-handler";

async function main() {
    await AppDataSource.initialize();
    await setOpenAiApiKey();

    const requestHandler = new RequestHandler();
    console.log("Server is listening at port %d", requestHandler.PORT);
}

main();