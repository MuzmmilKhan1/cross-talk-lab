"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
class Server {
    PORT;
    app;
    constructor(PORT = 8080) {
        this.PORT = PORT;
        this.app = (0, express_1.default)();
        this.useMiddlewires();
    }
    useMiddlewires() {
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    start() {
        this.app.listen(this.PORT);
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map