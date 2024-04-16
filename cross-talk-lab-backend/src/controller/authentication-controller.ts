import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { userRepository } from "../models/app-datasource";

interface ILogin {
    email: string,
    password: string
}

export class AuthenticationController {

    public async login(req: Request, res: Response) {
        const { email, password } = req.body as ILogin;
        const user = await userRepository.findOneBy({ email });
        if (
            user &&
            await bcrypt.compare(password, user.password)
        ) {
            req.session.isLoggedIn = true;
            req.session.userId = user.id;
            res.json({ success: true });
        } else {
            res.json({ success: false, error: 'INVALID_CREDENTIALS' });
        }
    }

    public async logout(req: Request, res: Response) {
        req.session.isLoggedIn = false;
        req.session.userId = undefined;
        res.json({ success: true });
    }

    public async loginStatus(req: Request, res: Response) {
        res.json({ isLoggedIn: req.session.isLoggedIn === true });
    }

}