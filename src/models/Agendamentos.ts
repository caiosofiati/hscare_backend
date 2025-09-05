import mongoose, { Schema, Document } from 'mongoose';

export interface IAgendamentos extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  title: string;
  date: Date; 
  location?: string; 
  description?: string; 
}

const AgendamentoSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String },
  description: { type: String },
});

export default mongoose.model<IAgendamentos>('Agendamentos', AgendamentoSchema);