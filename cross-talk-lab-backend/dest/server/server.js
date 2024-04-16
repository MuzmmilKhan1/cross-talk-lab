"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const app_datasource_1 = require("../models/app-datasource");
const connect_typeorm_1 = require("connect-typeorm");
class Server {
    PORT;
    app;
    constructor(PORT = 80) {
        this.PORT = PORT;
        this.app = (0, express_1.default)();
        this.useMiddlewires();
    }
    useMiddlewires() {
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        this.app.use((0, express_session_1.default)({
            resave: false,
            saveUninitialized: false,
            store: new connect_typeorm_1.TypeormStore({
                cleanupLimit: 2,
                limitSubquery: false, // If using MariaDB.
                ttl: 86400
            }).connect(app_datasource_1.sessionRepository),
            secret: "keyboard cat"
        }));
    }
    start() {
        this.app.listen(this.PORT);
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map