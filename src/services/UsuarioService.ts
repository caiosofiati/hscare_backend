import User, { IUsuario } from '../models/Usuario';
import { ObjectId } from 'mongodb';
import logger from '../utils/logger';

export class UsuarioService {
      public async buscarUsuarioPorEmail(email: string): Promise<IUsuario | null> {
        logger.info(`Buscando usuario de email ${email}`);
        
        return User.findOne({email: email}).select('-senhaHash');
    }

      public async atualizarUsuario(idUsuario: string, dadosAtualizados: object): Promise<IUsuario | null> {
        logger.info(`Atualizando dados do usuario ${idUsuario}`);

        return User.findOneAndUpdate(new ObjectId(idUsuario), dadosAtualizados, { new: true }).select('-senhaHash');
    }
}

export default new UsuarioService();