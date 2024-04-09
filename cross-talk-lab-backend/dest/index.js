"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_datasource_1 = require("./models/app-datasource");
const request_handler_1 = require("./server/request-handler");
async function main() {
    process.env.OPENAI_API_KEY = "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";
    await app_datasource_1.AppDataSource.initialize();
    const requestHandler = new request_handler_1.RequestHandler();
    console.log("Server is listening at port %d", requestHandler.PORT);
}
main();
//# sourceMappingURL=index.js.map