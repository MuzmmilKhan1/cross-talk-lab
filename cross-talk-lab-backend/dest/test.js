"use strict";
// import { VectorData } from "./helpers/vector-data";
// import { Chainer } from "./helpers/chainer";
// import bcrypt from "bcrypt";
// import fsp from "fs/promises";
// import { Scrapper } from "./helpers/scrapper";
Object.defineProperty(exports, "__esModule", { value: true });
const image_text_1 = require("./helpers/image-text");
// process.env.OPENAI_API_KEY = "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";
async function test() {
    // const question = "What is cyberify?";
    // const vectorDataPath = "vector-database/0634459f-e511-4dd3-9545-52605cadf96f";
    // const vectorData = await VectorData.load(vectorDataPath);
    // const chainer = new Chainer();
    // const answer = await chainer.answerQuestion(question, [vectorData.vectorStore]);
    // console.log(answer);
    // const hashed = await bcrypt.hash("password", 3);
    // console.log(hashed);
    // const scrapper = new Scrapper("https://cyberify.co/about-us/");
    // const contents = await scrapper.getParagraphsRecursively();
    // await fsp.writeFile("scrapped-content.json", JSON.stringify(contents));
    // console.log("done");
    const imageText = await image_text_1.ImageText.instantiate();
    const extraction = await imageText.extractParagraphs("C:\\Users\\Super\\Desktop\\zohaib\\eng_bw.png");
    console.log(extraction);
}
test();
//# sourceMappingURL=test.js.map