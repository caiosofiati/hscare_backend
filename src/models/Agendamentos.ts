import mongoose, { Schema, Document } from 'mongoose';

export interface IAgendamentos extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  titulo: string;
  data: Date; 
  local?: string; 
  descricao?: string; 
}

const AgendamentoSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  titulo: { type: String, required: true },
  data: { type: Date, required: true },
  local: { type: String },
  descricao: { type: String },
});

export default mongoose.model<IAgendamentos>('Agendamentos', AgendamentoSchema);