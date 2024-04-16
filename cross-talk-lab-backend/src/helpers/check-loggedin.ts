import { Request, Response, NextFunction } from "express";

export function checkLoggedIn(req: Request, res: Response, next: NextFunction) {
    if (req.session.isLoggedIn) next();
    else res.json({ error: "UNAUTHENTICATED", success: false });
}