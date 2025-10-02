import { Router } from 'express';
import fichaMedicaController from '../controllers/fichaMedicaController';
import { protect } from '../middleware/authMiddleware';

const router = Router();
const controller = fichaMedicaController;

router.get('/', protect, controller.getFichaMedica);
router.post('/', protect, controller.criaOuAtualizaFichaMedica);

export default router;