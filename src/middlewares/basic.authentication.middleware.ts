import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/erros/forbidden.erros";
import userRepository from "../repositorios/user.repository";

async function basicAuthenticationMiddleware(
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

    if (authenticationType !== "Basic" || !token) {
      throw new ForbiddenError("Tipo de autenticação inválido!");
    }

    const tokenContent = Buffer.from(token, "base64").toString("utf-8");
    const [username, password] = tokenContent.split(":");

    if (!username || !password) {
      throw new ForbiddenError("Credenciais não foram preenchidas!");
    }
    const user = await userRepository.findByUsernameAndPassword(
      username,
      password
    );
    if (!user) {
      throw new ForbiddenError("Usuário não existe");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
export default basicAuthenticationMiddleware;
