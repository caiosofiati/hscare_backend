import mongoose, { Schema, Document } from 'mongoose';

// Sub-documento para os medicamentos dentro da receita
const Medicamentos = new Schema({
    nome: { type: String, required: true },
    dosagem: { type: String },
    instrucoes: { type: String },
});

export interface IReceitas extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  medico: string;
  crm?: string;
  dataEmissao: Date;
  dataValidade?: Date;
  medicamentos: { nome: string; dosagem?: string; instrucoes?: string; }[];
  cor?: string;
}

const ReceitaSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  medico: { type: String, required: true },
  crm: { type: String },
  dataEmissao: { type: Date, required: true },
  dataValidade: { type: Date },
  medicamentos: [Medicamentos],
  cor: { type: String },
}, {
  timestamps: true
});

export default mongoose.model<IReceitas>('Receitas', ReceitaSchema);