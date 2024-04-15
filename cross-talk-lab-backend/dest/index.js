"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openai_api_key_1 = require("./helpers/openai-api-key");
const app_datasource_1 = require("./models/app-datasource");
const request_handler_1 = require("./server/request-handler");
async function main() {
    await app_datasource_1.AppDataSource.initialize();
    await (0, openai_api_key_1.setOpenAiApiKey)();
    const requestHandler = new request_handler_1.RequestHandler();
    console.log("Server is listening at port %d", requestHandler.PORT);
}
main();
//# sourceMappingURL=index.js.map