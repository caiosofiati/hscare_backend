import { Router } from 'express';
import { getLembretes, criaLembrete, atualizaLembrete } from '../controllers/lembretesController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.get('/', protect, getLembretes);
router.post('/', protect, criaLembrete);
router.put('/:id', protect, atualizaLembrete);

export default router;