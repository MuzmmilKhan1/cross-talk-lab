// import { VectorData } from "./helpers/vector-data";
// import { Chainer } from "./helpers/chainer";
import bcrypt from "bcrypt";

// process.env.OPENAI_API_KEY = "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";

async function test() {
    // const question = "What is cyberify?";
    // const vectorDataPath = "vector-database/0634459f-e511-4dd3-9545-52605cadf96f";
    // const vectorData = await VectorData.load(vectorDataPath);
    // const chainer = new Chainer();
    // const answer = await chainer.answerQuestion(question, [vectorData.vectorStore]);
    // console.log(answer);
    const hashed = await bcrypt.hash("password", 3);
    console.log(hashed);
}

test();
