import { Router } from 'express';
import authController from '../controllers/authController';

const router = Router();
const controller = authController;

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/profile', controller.getUserProfile);
router.put('/profile', controller.updateUserProfile);

export default router;