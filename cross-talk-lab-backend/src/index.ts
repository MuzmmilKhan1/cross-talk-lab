import { AppDataSource } from "./models/app-datasource";
import { RequestHandler } from "./server/request-handler";

async function main() {
    process.env.OPENAI_API_KEY = "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";
    await AppDataSource.initialize();
    const requestHandler = new RequestHandler();
    console.log("Server is listening at port %d", requestHandler.PORT);
}

main();