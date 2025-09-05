import mongoose, { Schema, Document as MongooseDocument } from 'mongoose';

export interface IDocumentos extends MongooseDocument {
  userId: mongoose.Schema.Types.ObjectId;
  title: string; 
  filePath: string;
  fileType: string;
}

const DocumentoSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  filePath: { type: String, required: true },
  fileType: { type: String, required: true },
});

export default mongoose.model<IDocumentos>('Documentos', DocumentoSchema

);