import app from "./app";
import dotenv from 'dotenv';
import Database from "./config/database";
import logger from "./utils/logger";

dotenv.config();

const port = 3000;

app.listen(port, async () => {
  logger.info(`Servidor rodando na porta ${port}`);

  await Database.conectar();
});