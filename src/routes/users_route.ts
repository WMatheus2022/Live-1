import { Router, Request, Response, NextFunction } from "express";
import StatusCodes from "http-status-codes";

const usersRouter = Router();

usersRouter.get("/users", (req: Request, res: Response, next: NextFunction) => {
  const users = [{ userName: "wander" }];

  res.status(StatusCodes.OK).send(users);
});

usersRouter.get(
  "/users/:uuid",
  (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;

    res.status(StatusCodes.OK).send({ uuid });
  }
);

usersRouter.post(
  "/users",
  (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;
    res.status(StatusCodes.CREATED).send(newUser);
  }
);

usersRouter.put(
  "/users/:uuid",
  (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifiedUser = req.body;

    modifiedUser.uuid = uuid;

    res.status(StatusCodes.OK).send(modifiedUser);
  }
);
usersRouter.delete(
  "/users/:uuid",
  (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    res.status(StatusCodes.OK);
  }
);

export default usersRouter;
