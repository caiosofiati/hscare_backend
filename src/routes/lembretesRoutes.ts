import { Router } from 'express';
import LembretesController from '../controllers/lembretesController';
import { protect } from '../middleware/authMiddleware';

const router = Router();
const controller = LembretesController;

router.post('/', protect, controller.criaLembrete);
router.get('/', protect, controller.getLembretes);
router.put('/:id', protect, controller.atualizaLembrete);
router.delete('/:id', protect, controller.deletaLembrete);

export default router;