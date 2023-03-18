import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/erros/forbidden.erros";
import  Jwt  from "jsonwebtoken";
import User_repository from "../repositorios/user.repository";

async function jwtAthenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHander = req.headers["authorization"];

    if (!authorizationHander) {
      throw new ForbiddenError("Credenciais não informadas!");
    }

    const [authenticationType, token] = authorizationHander.split(" ");

    if (authenticationType !== "Bearer" || !token) {
      throw new ForbiddenError("Tipo de autenticação inválido!");
    }

    const tokenPayload = Jwt.verify(token, "my_secret_key");

    if (typeof tokenPayload !== "object" || !tokenPayload.sub) {
      throw new ForbiddenError("token inválido");
    }

    const uuid = tokenPayload.sub;
    const user = await User_repository.findById(uuid);
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}

export default jwtAthenticationMiddleware;
