import app from "./app";
import mongoose from 'mongoose';
import dotenv from 'dotenv'; 

// Rotas
import authRoutes from './routes/authRoutes';
import agendamentosRoutes from './routes/agendamentosRoutes';
import lembretesRoutes from './routes/lembretesRoutes';
import fichaMedicaRoutes from './routes/fichaMedicaRoutes';
import receitasRoutes from './routes/receitasRoutes';
// import documentosRoutes from './routes/documentosRoutes';


dotenv.config();

app.listen(3000, async () => {
  console.log("Servidor rodando na porta 3000");
});

mongoose.connect(process.env.MONGO_AC || '')
  .then(() => console.log('MongoDB Conectado'))
  .catch(err => console.log(err));

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/ficha-medica', fichaMedicaRoutes);
app.use('/api/agendamentos', agendamentosRoutes); 
app.use('/api/lembretes', lembretesRoutes); 
app.use('/api/receitas', receitasRoutes); 
// app.use('/api/documentos', documentosRoutes);