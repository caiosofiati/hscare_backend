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
            const erroUsuarioJaCadastrado: any = new Error("Usuário já cadastrado com este email.");
            erroUsuarioJaCadastrado.statusCode = 422;
            throw erroUsuarioJaCadastrado;
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

        let erro: any;

            if (!usuario) {
            erro = new Error("Usuário não encontrado.");
            erro.statusCode = 404;
            throw erro;
            }

        const validaSenha = await bcrypt.compare(senha, usuario.senhaHash);
            if (!validaSenha) {
            erro = new Error("Credenciais inválidas.");
            erro.statusCode = 401;
            throw erro;
            }
            
        const token = this.generateToken(usuario.id);

        return { token, usuario };
  }
}

export default new AuthService();