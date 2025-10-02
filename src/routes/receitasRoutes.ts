import { Router } from "express";
import ReceitasController from "../controllers/receitasController";
import { protect } from "../middleware/authMiddleware";

const router = Router();
const controller = ReceitasController;

// Aponta cada rota para um método específico da instância do controller
router.post("/", protect, controller.criaReceita);
router.get("/", protect, controller.getReceitas);

router.put("/:id", protect, controller.atualizaReceita);
router.delete("/:id", protect, controller.deletaReceita);

export default router;