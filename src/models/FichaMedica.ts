import mongoose, { Schema, Document } from 'mongoose';

export interface IFichaMedica extends Document {
  userId: string;
  tipoSanguineo?: string;
  alergias?: Array<string>;
  doencaCronica?: Array<string>;
  medicamentos?: Array<string>;
  doadorOrgaos?: Boolean;
  dataNascimento?:  Date;
  genero?: String ;  
}

const FichaSchema: Schema = new Schema({
  userId: { type: String, ref: 'User', required: true, unique: true },
  tipoSanguineo: { type: String },
  alergias: { type: Array<string> },
  doencaCronica: { type: Array<string> },
  medicamentos: { type: Array<string> },
  doadorOrgaos: { type: Boolean, default: false }, //Add no BD
  dataNascimento: { type: Date }, //Add no BD
  genero: { type: String }, //Add no BD 


});

export default mongoose.model<IFichaMedica>('FichaMedica', FichaSchema, 'fichaMedica');