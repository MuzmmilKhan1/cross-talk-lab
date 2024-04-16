import express, { Express } from 'express';
import cors from "cors";
import expressSession from "express-session";
import { sessionRepository } from '../models/app-datasource';
import { TypeormStore } from "connect-typeorm";

declare module 'express-session' {
    interface SessionData {
        isLoggedIn?: boolean,
        userId: number
    }
}


export class Server {

    public app: Express;

    constructor(
        public readonly PORT = 80
    ) {
        this.app = express();
        this.useMiddlewires();
    }

    useMiddlewires() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(
            expressSession({
                resave: false,
                saveUninitialized: false,
                store: new TypeormStore({
                    cleanupLimit: 2,
                    limitSubquery: false, // If using MariaDB.
                    ttl: 86400
                }).connect(sessionRepository),
                secret: "keyboard cat"
            })
        );
    }

    start() {
        this.app.listen(this.PORT);
    }

}