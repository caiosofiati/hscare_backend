import app from "./app";
import authRoutes from './routes/authRoutes';
import mongoose from 'mongoose';
import dotenv from 'dotenv'; 

dotenv.config();

app.listen(3000, async () => {
  console.log("Servidor rodando na porta 3000");
});

mongoose.connect(process.env.MONGO_AC || '')
  .then(() => console.log('MongoDB Conectado'))
  .catch(err => console.log(err));

// Rotas da API
app.use('/api/auth', authRoutes); //Login & Registro
