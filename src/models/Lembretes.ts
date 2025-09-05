import mongoose, { Schema, Document } from 'mongoose';

export interface ILembretes extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  data: Date;
  titulo: string;
  descricao?: string;
  recorrente?: boolean;
  intervaloRecorrencia?: number; 
}

const LembreteSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  data: { type: Date, required: true },
  titulo: { type: String, required: true },
  descricao: { type: String },
  recorrente: { type: Boolean, default: false },
  intervaloRecorrencia: { type: Number },
});

export default mongoose.model<ILembretes>('Lembretes', LembreteSchema);