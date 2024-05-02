import { ErrorLogs } from "../models/error-log";
import { errorLogsRepository } from "../models/app-datasource";
import { Request, Response } from "express";

export class LogsController {
    public async index(req: Request, res: Response){
        const error_logs = await errorLogsRepository.find();
        res.json(error_logs);
    }
}