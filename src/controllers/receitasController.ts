import { Request, Response } from 'express';
import Receitas from '../models/Receitas';

// GET 
export const getReceitas = async (req: Request, res: Response) => {
  try {
    const _receitas = await Receitas.find({ userId: req.user?.id }).sort({ dataEmissao: 'desc' });
    res.json(_receitas);
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
};

// POST 
export const criaReceita = async (req: Request, res: Response) => {
  const { medico, crm, dataEmissao, dataValidade, medicamentos, cor } = req.body;
  try {
    const novaReceita = new Receitas({
      userId: req.user?.id,
      medico, crm, dataEmissao, dataValidade, medicamentos, cor
    });
    const _receita = await novaReceita.save();
    res.status(201).json(_receita);
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
};

// PUT 
export const atualizaReceita = async (req: Request, res: Response) => {
  try {
    const _receita = await Receitas.findById(req.params.id);
    if (!_receita) {
      return res.status(404).json({ msg: 'Receita não encontrada.' });
    }
    if (_receita.userId.toString() !== req.user?.id) {
      return res.status(401).json({ msg: 'Não autorizado.' });
    }
    const atualizaReceita = await Receitas.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(atualizaReceita);
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
};