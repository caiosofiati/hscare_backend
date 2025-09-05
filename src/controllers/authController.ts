import { Request, Response } from 'express';
import User from '../models/Usuario'; //Import de dados do usuario do DB
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Função de Registro
export const register = async (req: Request, res: Response) => {
  const { nome, email, senha } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Usuário já existe' });
    }

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    user = new User({ nome, email, senhaHash });
    await user.save();

    const payload = { userId: user.id };
    jwt.sign(payload, process.env.JWT_SECRET || 'seu_segredo', { expiresIn: '5h' }, (err, token) => {
      if (err) throw err;
      res.status(201).json({ token });
    });

  }catch(err){
    if (err instanceof Error) {
      console.error(err.message);
    }
    res.status(500).send('Erro no servidor');
  }
  };

// Função de Login
export const login = async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  try {
    if (!email || !senha) {
      return res.status(400).json({ msg: 'Por favor, forneça email e senha' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    const isMatch = await bcrypt.compare(senha, user.senhaHash);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    const payload = { userId: user.id };
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'seu_segredo',
      { expiresIn: '5h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  }catch(err){
    if (err instanceof Error) {
      console.error(err.message);
    }
    res.status(500).send('Erro no servidor');
  }
};