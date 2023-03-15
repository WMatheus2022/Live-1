import express from "express";
import statusRoute from "./routes/status.route";
import usersRouter from "./routes/users_route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(statusRoute);
app.use(usersRouter);

const port = 3000;

app.use(statusRoute);

app.listen(port, () => {
  console.log(`Aplicação rodando na porta:${port} com sucesso!!`);
});
