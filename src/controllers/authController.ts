import { Request, Response } from 'express';
import User from '../models/User'; //Import de dados do usuario do DB

// Função de Registro
export const register = async (req: Request, res: Response) => {
  const { nome, email, senha } = req.body;

  //Adicionar função para validação de registro
  try{
    if(!nome || !email || !senha){
      return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
    }
    //Validação se já existe email na base -> email tem que ser UQ no DB
    //Método para encrypt da senha
    res.json({ nome, email, senha});

  }catch(err){
    console.error();
  }
};

// Função de Login
export const login = async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  //Adicionar função de validação de login
  try{
    if(!email || !senha){
      return res.status(400).json({ message: "Digite e-mail e senha!" })
    }
    res.json({ email, senha });
  }catch(err){
    console.error();
  }
};
