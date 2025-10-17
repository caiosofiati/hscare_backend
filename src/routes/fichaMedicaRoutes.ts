import express from 'express';
import { ApiRouter } from './api.router';
import { FichaMedicaController } from '../controllers/fichaMedicaController';
import { protect } from '../middleware/authMiddleware';
import { InputFichaMedica } from '../models/interfaces/InputFichaMedica';

export class FichaMedicaApi extends ApiRouter {
    private readonly pathFichaMedica: string;
    private readonly controller = new FichaMedicaController({});

    constructor() {
        super();
        this.pathFichaMedica = "/fichamedica";
    }

    public active(): boolean {
        return true;
    }

    public async applyRoutes(server: express.Application): Promise<void> {

        server.get(`${this.pathFichaMedica}`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
            try {
                const idUsuario = String(request.query.idUsuario);
                const ficha = await this.controller.getFichaMedica(idUsuario);

                if (!ficha) {
                    return response.json({ msg: 'Ficha médica não encontrada.' });
                }
                return response.json(ficha);
            } catch (error) {
                next(error);
            }
        });

        server.post(`${this.pathFichaMedica}`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
            try {
                const fichaMedica: InputFichaMedica = {
                    userId: request.headers.idUsuario as string,
                    tipoSanguineo: request.body.tipoSanguineo,
                    alergias: request.body.alergias,
                    tabagismo: request.body.tabagismo,
                    drogas: request.body.drogas,
                    etilista: request.body.etilista,
                    tipoDieta: request.body.tipoDieta,
                    doencaCronica: request.body.doencaCronica,
                    medicamentos: request.body.medicamentos,
                };
                const ficha = await this.controller.criarOuAtualizar(fichaMedica, fichaMedica.userId);

                return response.json(ficha);
            } catch (error) {
                next(error);
            }
        });
    }
}