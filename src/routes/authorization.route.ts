import { NextFunction, Request, Response, Router } from "express";
import JWT from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import basicAuthenticationMiddleware from "../middlewares/basic.authentication.middleware";
import ForbiddenError from "../models/erros/forbidden.erros";
import jwtAthenticationMiddleware from "../middlewares/jwt-athenticatiion.middleware";

const authorizationRoute = Router();

authorizationRoute.post('/token/validate', jwtAthenticationMiddleware, (req: Request, res: Response, next: NextFunction) => {

  res.sendStatus(StatusCodes.OK);

});

authorizationRoute.post(
  "/token",
  basicAuthenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if(!user){
        throw new ForbiddenError('Usuário não informado');
      }

      const jwtPayload = { username: user.username };
      const jwtOptions = { subject: user?.uuid };
      const secretkey = "my_secret_key";

      const jwt = JWT.sign(jwtPayload, secretkey, jwtOptions);

      res.status(StatusCodes.OK).json({ token: jwt });
    } catch (error) {
      next(error);
    }

  }
);



export default authorizationRoute;
