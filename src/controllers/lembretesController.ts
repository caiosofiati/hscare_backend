import { Request, Response } from 'express';
import Lembretes from '../models/Lembretes';

// GET
export const getLembretes = async (req: Request, res: Response) => {
  try {
    const _lembrete = await Lembretes.find({ userId: req.user?.id }).sort({ data: 'asc' });
    res.json(_lembrete);
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
};

// POST 
export const criaLembrete = async (req: Request, res: Response) => {
  const { data, titulo, descricao, recorrente, intervaloRecorrencia } = req.body;
  try {
    const novoLembrete = new Lembretes({
      userId: req.user?.id,
      data,
      titulo,
      descricao,
      recorrente,
      intervaloRecorrencia,
    });
    const _lembrete = await novoLembrete.save();
    res.status(201).json(_lembrete);
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
};

// PUT 
export const atualizaLembrete = async (req: Request, res: Response) => {
  try {
    const _lembrete = await Lembretes.findById(req.params.id);
    if (!_lembrete) {
      return res.status(404).json({ msg: 'Lembrete não encontrado.' });
    }
    if (_lembrete.userId.toString() !== req.user?.id) {
      return res.status(401).json({ msg: 'Não autorizado.' });
    }
    const atualizaLembrete = await Lembretes.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(atualizaLembrete);
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
};