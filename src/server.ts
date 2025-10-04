import app from "./app";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Database from "./config/database";

dotenv.config();

const port = 3000;

app.listen(port, async () => {
  console.log(`Servidor rodando na porta ${port}`);

  await Database.conectar();
});