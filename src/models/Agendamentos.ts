import mongoose, { Schema, Document } from 'mongoose';

export interface IAgendamentos extends Document {
  userId: string;
  titulo: string;
  data: Date;
  local?: string;
  descricao?: string;
}

const AgendamentoSchema: Schema = new Schema({
  userId: { type: String, ref: 'User', required: true },
  titulo: { type: String, required: true },
  data: { type: Date, required: true },
  local: { type: String },
  descricao: { type: String },
});

export default mongoose.model<IAgendamentos>('Agendamentos', AgendamentoSchema);