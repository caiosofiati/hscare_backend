import express from 'express';
import { ApiRouter } from './api.router';
import { LembretesController } from '../controllers/lembretesController';
import { InputCriarLembrete } from '../models/interfaces/InputCriarLembrete';

export class LembretesApi extends ApiRouter {
    private readonly pathLembretes: string;
    private readonly controller = new LembretesController({});

    constructor() {
        super();
        this.pathLembretes = "/lembretes";
    }

    public active(): boolean {
        return true;
    }

    public async applyRoutes(server: express.Application): Promise<void> {

        server.get(`${this.pathLembretes}`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
            try {
                const idUsuario = String(request.query.idUsuario);

                return response.json(await this.controller.buscarLembretes(idUsuario));
            } catch (error) {
                next(error);
            }
        });

        server.post(`${this.pathLembretes}`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
            try {
                const idUsuario = String(request.body.idUsuario);
                const criaLembrete: InputCriarLembrete = {
                    data: request.body.data,
                    titulo: request.body.titulo,
                    dias: request.body.dias,
                };

                const novoLembrete = await this.controller.criaLembrete(criaLembrete, idUsuario);

                return response.json(novoLembrete);
            } catch (error) {
                next(error);
            }
        });

        server.delete(`${this.pathLembretes}`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
            try {
                const idUsuario = String(request.query.idUsuario);
                const idLembrete = String(request.query.idLembrete);

                const sucesso = await this.controller.deletaLembrete(idLembrete, idUsuario);

                if (!sucesso) {
                    return response.json({ msg: 'Lembrete não encontrado ou não autorizado.' });
                }

                response.json({ msg: 'Lembrete removido com sucesso.' });
            } catch (error) {
                next(error);
            }
        });
    }
}