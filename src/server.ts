import app from "./app";
import { Database } from "./configuration/database";

app.listen(3000, async () => {
  console.info("Servidor rodando na porta 3000");

  await Database.conectar();
});