import mongoose, { Schema, Document } from 'mongoose';

//Interface do usuário
export interface User extends Document {
  email: string;
  senha: string;
  nome: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  nome: { type: String, required: true },
});

export default mongoose.model<User>('User', UserSchema);