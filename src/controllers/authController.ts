import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/AuthService';

class AuthController {

  // POST - Registro
  public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { user, token } = await AuthService.registro(req.body);
      // Retornamos o token para o utilizador ser logado automaticamente
      res.status(201).json({ token });
    } catch (error) {
      next(error);
    }
  }

  // POST - Login
  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { token } = await AuthService.login(req.body);
      res.json({ token });
    } catch (error) {
      // Para erros de login, é comum retornar 401 (Não Autorizado)
      if (error instanceof Error && error.message === 'Credenciais inválidas.') {
        res.status(401).json({ msg: error.message });
        return;
      }
      next(error);
    }
  }

  // GET - Perfil do usuário
  public async getUserProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await AuthService.getPerfil(req.user!.id);
      if (!user) {
        res.status(404).json({ msg: 'Utilizador não encontrado.' });
        return;
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  // PUT - Atualiza o perfil do usuário
  public async updateUserProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updatedUser = await AuthService.atualizaPerfil(req.user!.id, req.body);
      if (!updatedUser) {
        res.status(404).json({ msg: 'Utilizador não encontrado.' });
        return;
      }
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();