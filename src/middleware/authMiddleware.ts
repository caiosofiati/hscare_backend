import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Adicionamos uma propriedade 'user' à interface Request do Express
declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      token = authHeader.split(' ')[1];

      // Verifica se o token é válido
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'seu_segredo') as { userId: string };

      // Adiciona os dados do usuário (apenas o ID) na requisição
      req.user = { id: decoded.userId };
      next();
    } catch (error) {
      res.status(401).json({ msg: 'Token inválido, autorização negada' });
    }
  }

  if (!token) {
    res.status(401).json({ msg: 'Nenhum token, autorização negada' });
  }
};