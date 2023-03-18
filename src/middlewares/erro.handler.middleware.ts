import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import DatabaseError from "../models/erros/database.erros";
import ForbiddenError from "../models/erros/forbidden.erros";

function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {

    if(error instanceof DatabaseError) {
        res.sendStatus(StatusCodes.BAD_REQUEST);
     } else if(error instanceof ForbiddenError){
        res.sendStatus(StatusCodes.FORBIDDEN);
     } else {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
export default errorHandler;