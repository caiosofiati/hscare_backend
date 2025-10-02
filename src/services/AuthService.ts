import User, { IUsuario } from '../models/Usuario';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthService {
    // Registro de um novo usuário
    public async registro(userData: any): Promise<{ user: IUsuario, token: string }> {
        const { nome, email, senha } = userData;

    // Verifica se o usuário já existe
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error('Já existe um usuário com este e-mail.');
    }

    // Criptografar a senha
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    // Salvar no banco
    const user = new User({ nome, email, senhaHash });
    await user.save();

    // Gerar token
    const token = this.generateToken(user.id);

    return { user, token };
    }

    // Login de um usuário existente
    public async login(credentials: any): Promise<{ token: string }> {
    const { email, senha } = credentials;

    // Busca o usuário pelo e-mail
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Credenciais inválidas.');
    }

    // Valida a senha
    const isMatch = await bcrypt.compare(senha, user.senhaHash);
    if (!isMatch) {
        throw new Error('Credenciais inválidas.');
    }

    // Gera o token
    const token = this.generateToken(user.id);
    return { token };
  }

    // Busca o perfil do usuário
    public async getPerfil(userId: string): Promise<IUsuario | null> {
    // Retorna os dados do usuário, excluindo a senha
    return User.findById(userId).select('-senhaHash');
  }

    // Atualiza o perfil do usuário
    public async atualizaPerfil(userId: string, updateData: any): Promise<IUsuario | null> {
    // REGRA DE NEGÓCIO: Poderíamos adicionar validações aqui, como verificar se o novo e-mail já está em uso por outro usuário.
    return User.findByIdAndUpdate(userId, updateData, { new: true }).select('-senhaHash');
  }

    // Gera um token JWT
    private generateToken(userId: string): string {
    const payload = { userId };
    return jwt.sign(payload, process.env.JWT_SECRET || 'seu_segredo', {
        expiresIn: '5h',
    });
  }
}

export default new AuthService();