import mongoose, { Schema, Document } from 'mongoose';

export interface ILembretes extends Document {
  idUsuario: mongoose.Schema.Types.ObjectId;
  data: Date;
  titulo: string;
  dias: string[];
}

const LembreteSchema: Schema = new Schema({
  idUsuario: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  data: { type: Date, required: true },
  titulo: { type: String, required: true },
  dias: { type: Array<String>, required: true },
});

export default mongoose.model<ILembretes>('Lembretes', LembreteSchema);