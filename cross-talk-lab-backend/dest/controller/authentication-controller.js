"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const app_datasource_1 = require("../models/app-datasource");
class AuthenticationController {
    async login(req, res) {
        const { email, password } = req.body;
        const user = await app_datasource_1.userRepository.findOneBy({ email });
        if (user &&
            await bcrypt_1.default.compare(password, user.password)) {
            req.session.isLoggedIn = true;
            req.session.userId = user.id;
            res.json({ success: true });
        }
        else {
            res.json({ success: false, error: 'INVALID_CREDENTIALS' });
        }
    }
    async logout(req, res) {
        req.session.isLoggedIn = false;
        req.session.userId = undefined;
        res.json({ success: true });
    }
    async loginStatus(req, res) {
        res.json({ isLoggedIn: req.session.isLoggedIn === true });
    }
}
exports.AuthenticationController = AuthenticationController;
//# sourceMappingURL=authentication-controller.js.map