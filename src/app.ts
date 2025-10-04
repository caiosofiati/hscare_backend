import bodyParser  from "body-parser";
import express from "express";
import { Request, Response, NextFunction } from 'express';
import { AuthApi } from "./routes/authRoutes";
import { UsuarioApi } from "./routes/usuarioRoutes";
import { ApiRouter } from "./routes/api.router";
import { protect } from "./middleware/authMiddleware";
import rotasQueNaoPrecisaValidarToken from "./utils/jsons/rotasQueNaoPrecisaValidarOToken.json";

const getApiControllers = (): ApiRouter[] => [new AuthApi(), new UsuarioApi()];

const app = express();

app.use(bodyParser.json());
app.use(async (req: Request, res: Response, next: NextFunction) => {
    if(!rotasQueNaoPrecisaValidarToken.includes(req.path)) {
        await protect(req, res, next)
    };

    next();
});

for(const router of getApiControllers()) {
    if(router.active()) {
        router.applyRoutes(app);
        console.log(`Rota ${router.constructor ? router.constructor.name : ""} configurada.`);
    }
}

export default app;