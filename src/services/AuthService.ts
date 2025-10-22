import User, { IUsuario } from '../models/Usuario';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { InputRegistrarUsuario } from '../models/interfaces/InputRegistrarUsuario';
import { OutputRegistrarUsuario } from '../models/interfaces/OutputRegistrarUsuario';
import logger from '../utils/logger';

export class AuthService {
    private generateToken(userId: string): string {
        const payload = { userId };

        return jwt.sign(payload, process.env.JWT_SECRET || 'seu_segredo', {
            expiresIn: '5h',
        });
    };

    async registro(dadosUsuario: InputRegistrarUsuario): Promise<OutputRegistrarUsuario> {
    logger.info(`Criando novo usuario com email ${dadosUsuario.email}`);

    const { nome, email, senha, cpf } = dadosUsuario;

    const buscarUsuario = await User.findOne({ email });

        if (buscarUsuario) {
            throw new Error('Já existe um usuario com este e-mail.');
        }

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    const usuario = new User({ nome, email, senhaHash });
    await usuario.save();

    const token = this.generateToken(usuario.id);

    return { usuario, token };
 };

    async login(email: string, senha: string): Promise<OutputRegistrarUsuario> {
        logger.info(`Efetivando login para o usuario com email ${email}`);

        const usuario = await User.findOne({ email });
            if (!usuario) {
                throw new Error('Credenciais inválidas.');
            }

        const validaSenha = await bcrypt.compare(senha, usuario.senhaHash);
            if (!validaSenha) {
                throw new Error('Credenciais inválidas.');
            }
        const token = this.generateToken(usuario.id);

        return { token, usuario };
  }
}

export default new AuthService();