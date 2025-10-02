import mongoose, { Schema, Document as MongooseDocument } from 'mongoose';

export interface IDocumentos extends MongooseDocument {
  userId: mongoose.Schema.Types.ObjectId;
  titulo: string;
  nomeArquivo: string;
  arquivo: Buffer;
  arqTipo: string;
}

const DocumentoSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  titulo: { type: String, required: true },
  nomeArquivo: { type: String, required: true },
  arquivo: { type: Buffer, required: true },
  arqTipo: { type: String, required: true },
});

export default mongoose.model<IDocumentos>('Documentos', DocumentoSchema

);