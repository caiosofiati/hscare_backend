import { Router } from 'express';
import { getFichaMedica, criaAtualizaFichaMedica } from '../controllers/fichaMedicaController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.get('/', protect, getFichaMedica);
router.post('/', protect, criaAtualizaFichaMedica);

export default router;