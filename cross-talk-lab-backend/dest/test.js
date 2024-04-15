"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vector_data_1 = require("./helpers/vector-data");
const chainer_1 = require("./helpers/chainer");
process.env.OPENAI_API_KEY = "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";
async function test() {
    const question = "What is cyberify?";
    const vectorDataPath = "vector-database/0634459f-e511-4dd3-9545-52605cadf96f";
    const vectorData = await vector_data_1.VectorData.load(vectorDataPath);
    const chainer = new chainer_1.Chainer();
    const answer = await chainer.answerQuestion(question, [vectorData.vectorStore]);
    console.log(answer);
}
test();
//# sourceMappingURL=test.js.map