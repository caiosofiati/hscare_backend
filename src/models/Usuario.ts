import mongoose, { Schema, Document } from 'mongoose';

export interface IUsuario extends Document {
  nome: string;
  senhaHash: string;
  email: string;
  dataNascimento?: Date;
  telefone?: string;
  endereco?: string;
  cpf?: string;
  responsaveis?: mongoose.Schema.Types.ObjectId[];
  dependentes?: mongoose.Schema.Types.ObjectId[];
  contatos?: object[];
}

const UsuarioSchema: Schema = new Schema({
  nome: { type: String, required: true },
  senhaHash: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dataNascimento: { type: Date },
  telefone: { type: String },
  endereco: { type: String },
  cpf: { type: String, unique: true, sparse: true },
  responsaveis: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  dependentes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  contatos: [Object], 
});

export default mongoose.model<IUsuario>('Usuario', UsuarioSchema);