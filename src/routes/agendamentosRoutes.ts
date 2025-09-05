import { Router } from 'express';
import { getAgendamentos, criaAgendamento, atualizaAgendamento, deletaAgendamento } from '../controllers/agendamentosController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.get('/', protect, getAgendamentos);
router.post('/', protect, criaAgendamento);
router.put('/:id', protect, atualizaAgendamento);
router.delete('/:id', protect, deletaAgendamento);

export default router;