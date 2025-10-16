import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const protect = (req: Request, res: Response, next: NextFunction) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      token = authHeader.split(' ')[1];

      // Verifica se o token é válido
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'seu_segredo');

      return next();
    } catch (error) {
     return res.status(401).json({ msg: 'Token inválido, autorização negada' });
    }
  }

  if (!token) {
    return res.status(401).json({ msg: 'Nenhum token, autorização negada' });
  }
};