import { Request, Response, NextFunction } from 'express';

export class ErrorController {

    public exception(err: Error, req: Request, res: Response, next: NextFunction) {
        console.error(err);
        res.status(500).json({ success: false, error: "EXCEPTION_THROWN" });
    }

    public notFound(req: Request, res: Response) {
        res.status(404).json({ success: false, error: "NOT_FOUND" });
    }

}