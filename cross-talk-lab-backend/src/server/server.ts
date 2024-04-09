import express, { Express } from 'express';
import cors from "cors";

export class Server {

    public app: Express;

    constructor(
        public readonly PORT = 8080
    ) {
        this.app = express();
        this.useMiddlewires();
    }

    useMiddlewires() {
        this.app.use( express.urlencoded({ extended: true }) );
        this.app.use( express.json() );
        this.app.use( cors() );
    }

    start() {
        this.app.listen(this.PORT);
    }

}