import { Request, Response } from 'express';
import Agendamentos from '../models/Agendamentos';

// GET
export const getAgendamentos = async (req: Request, res: Response) => {
  try {
    const _agendamento = await Agendamentos.find({ userId: req.user?.id }).sort({ date: 'asc' });
    res.json(_agendamento);
  } catch (err) {
    if (err instanceof Error) console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};


// POST
export const criaAgendamento = async (req: Request, res: Response) => {
  const { title, date, location, description } = req.body;
  try {
    const novoAgendamento = new Agendamentos({
      userId: req.user?.id,
      title,
      date,
      location,
      description,
    });
    const _agendamento = await novoAgendamento.save();
    res.status(201).json(_agendamento);
  } catch (err) {
    if (err instanceof Error) console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};

// PUT
export const atualizaAgendamento = async (req: Request, res: Response) => {
  try {
    const _agendamento = await Agendamentos.findById(req.params.id);

    if (!_agendamento) {
      return res.status(404).json({ msg: 'Compromisso não encontrado' });
    }
    if (_agendamento.userId.toString() !== req.user?.id) {
      return res.status(401).json({ msg: 'Usuário não autorizado' });
    }

    const atualizaAgendamento = await Agendamentos.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(atualizaAgendamento);
  } catch (err) {
     if (err instanceof Error) console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};

// DELETE
export const deletaAgendamento = async (req: Request, res: Response) => {
  try {
    const appointment = await Agendamentos.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ msg: 'Compromisso não encontrado' });
    }
    if (appointment.userId.toString() !== req.user?.id) {
      return res.status(401).json({ msg: 'Usuário não autorizado' });
    }

    await appointment.deleteOne();
    res.json({ msg: 'Compromisso removido com sucesso' });
  } catch (err) {
     if (err instanceof Error) console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};