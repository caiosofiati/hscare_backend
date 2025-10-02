import { Router } from 'express';
import AgendamentosController from '../controllers/agendamentosController';
import { protect } from '../middleware/authMiddleware';

const router = Router();
const controller = AgendamentosController;

// O middleware 'protect' é passado como um passo ANTES do controller.
router.get('/', protect, controller.getAgendamentos);
router.post('/', protect, controller.criaAgendamento);
router.put('/:id', protect, controller.atualizaAgendamento);
router.delete('/:id', protect, controller.deletaAgendamento);

export default router;