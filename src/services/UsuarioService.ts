import User, { IUsuario } from '../models/Usuario';
import { ObjectId } from 'mongodb';

export class UsuarioService {
      public async buscarUsuarioPorEmail(email: string): Promise<IUsuario | null> {
        return User.findOne({email: email}).select('-senhaHash');
    }

      public async atualizarUsuario(idUsuario: string, dadosAtualizados: object): Promise<IUsuario | null> {
        return User.findOneAndUpdate(new ObjectId(idUsuario), dadosAtualizados, { new: true }).select('-senhaHash');
    }
}

export default new UsuarioService();