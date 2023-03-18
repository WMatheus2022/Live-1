import User from "../models/User_models";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}
