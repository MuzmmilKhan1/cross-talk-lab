"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { VectorData } from "./helpers/vector-data";
// import { Chainer } from "./helpers/chainer";
const bcrypt_1 = __importDefault(require("bcrypt"));
// process.env.OPENAI_API_KEY = "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";
async function test() {
    // const question = "What is cyberify?";
    // const vectorDataPath = "vector-database/0634459f-e511-4dd3-9545-52605cadf96f";
    // const vectorData = await VectorData.load(vectorDataPath);
    // const chainer = new Chainer();
    // const answer = await chainer.answerQuestion(question, [vectorData.vectorStore]);
    // console.log(answer);
    const hashed = await bcrypt_1.default.hash("password", 3);
    console.log(hashed);
}
test();
//# sourceMappingURL=test.js.map