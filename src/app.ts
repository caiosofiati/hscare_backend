import bodyParser from "body-parser";
import express from "express";
import { Request, Response, NextFunction } from 'express';
import { AuthApi } from "./routes/authRoutes";
import { UsuarioApi } from "./routes/usuarioRoutes";
import { AgendamentosApi } from "./routes/agendamentosRoutes";
import { LembretesApi } from "./routes/lembretesRoutes";
import { FichaMedicaApi } from "./routes/fichaMedicaRoutes";
import { ApiRouter } from "./routes/api.router";
import { protect } from "./middleware/authMiddleware";
import rotasQueNaoPrecisaValidarToken from "./utils/jsons/rotasQueNaoPrecisaValidarOToken.json";

const getApiControllers = (): ApiRouter[] => [new AuthApi(), new UsuarioApi(), new AgendamentosApi(), new LembretesApi(), new FichaMedicaApi()];

const app = express();

app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    // Verifica se a rota atual é uma das que NÃO precisam de validação
    const isPublicRoute = rotasQueNaoPrecisaValidarToken.includes(req.path);

    if (isPublicRoute) {
        next();
    } else {
        protect(req, res, next);
    }
});

for (const router of getApiControllers()) {
    if (router.active()) {
        router.applyRoutes(app);
        console.log(`Rota ${router.constructor ? router.constructor.name : ""} configurada.`);
    }
}

export default app;