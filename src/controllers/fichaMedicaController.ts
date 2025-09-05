import { Request, Response } from 'express';
import FichaMedica from '../models/FichaMedica';

// GET 
export const getFichaMedica = async (req: Request, res: Response) => {
  try {
    const record = await FichaMedica.findOne({ userId: req.user?.id });
    if (!record) {
      return res.status(404).json({ msg: 'Ficha médica não encontrada.' });
    }
    res.json(record);
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
};

// POST (Cria ou Atualiza)
export const criaAtualizaFichaMedica = async (req: Request, res: Response) => {
  const recordData = { ...req.body, userId: req.user?.id };

  try {
    const record = await FichaMedica.findOneAndUpdate(
      { userId: req.user?.id }, 
      recordData, 
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(200).json(record);
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
};