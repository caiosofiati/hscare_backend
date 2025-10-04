import User, { IUsuario } from '../models/Usuario';

export class UsuarioService {
      public async buscarUsuarioPorEmail(email: string): Promise<IUsuario | null> {
        return User.findOne({email: email}).select('-senhaHash');
    }

      public async atualizarUsuario(idUsuario: string, dadosAtualizados: object): Promise<IUsuario | null> {
        return User.findByIdAndUpdate(idUsuario, dadosAtualizados, { new: true }).select('-senhaHash');
    }
}

export default new UsuarioService();