import express from "express";
import statusRoute from "./routes/status.route";
import usersRouter from "./routes/users_route";
import errorHandler from "./middlewares/erro.handler.middleware";
import authorizationRoute from "./routes/authorization.route";
import jwtAthenticationMiddleware from "./middlewares/jwt-athenticatiion.middleware";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(statusRoute);
app.use(authorizationRoute);
app.use(jwtAthenticationMiddleware);
app.use(usersRouter);

app.use(errorHandler);

const port = 3000;

app.use(statusRoute);

app.listen(port, () => {
  console.log(`Aplicação rodando na porta:${port} com sucesso!!`);
});
