import mongoose, { Schema, Document } from 'mongoose';

export interface IFichaMedica extends Document {
  userId: string;
  tipoSanguineo?: string;
  alergias?: Array<string>;
  tabagismo?: boolean;
  drogas?: boolean;
  etilista?: boolean;
  tipoDieta?: string;
  doencaCronica?: Array<string>;
  medicamentos?: Array<string>;
}

const FichaSchema: Schema = new Schema({
  userId: { type: String, ref: 'User', required: true, unique: true },
  tipoSanguineo: { type: String },
  alergias: { type: Array<string> },
  tabagismo: { type: Boolean, default: false },
  drogas: { type: Boolean, default: false },
  etilista: { type: Boolean, default: false },
  tipoDieta: { type: String },
  doencaCronica: { type: Array<string> },
  medicamentos: { type: Array<string> },
});

export default mongoose.model<IFichaMedica>('FichaMedica', FichaSchema, 'fichaMedica');