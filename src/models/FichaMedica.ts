import mongoose, { Schema, Document } from 'mongoose';

export interface IFichaMedica extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  tipoSanguineo?: string;
  alergias?: string;
  tabagismo?: boolean;
  drogas?: boolean;
  etilista?: boolean;
  tipoDieta?: string;
  doencaCronica?: string;
  medicamentos?: string;
}

const FichaSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  tipoSanguineo: { type: String },
  alergias: { type: String },
  tabagismo: { type: Boolean, default: false },
  drogas: { type: Boolean, default: false },
  etilista: { type: Boolean, default: false },
  tipoDieta: { type: String },
  doencaCronica: { type: String },
  medicamentos: { type: String }, 
});

export default mongoose.model<IFichaMedica>('FichaMedica', FichaSchema, 'fichaMedica');