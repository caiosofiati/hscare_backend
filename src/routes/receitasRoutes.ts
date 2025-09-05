import { Router } from "express";
import { getReceitas, criaReceita, atualizaReceita } from "../controllers/receitasController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.get("/", protect, getReceitas);
router.post("/", protect, criaReceita);
router.put("/:id", protect, atualizaReceita);

export default router;