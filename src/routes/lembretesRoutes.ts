import express from 'express';
import { ApiRouter } from './api.router';
import { LembretesController } from '../controllers/lembretesController';
import { InputCriarLembrete } from '../models/interfaces/InputCriarLembrete';
import { InputAtualizarLembrete } from '../models/interfaces/InputAtualizarLembrete';

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

        // Rota para buscar todos os lembretes
        server.get(`${this.pathLembretes}`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
            try {
                const idUsuario = String(request.headers.idUsuario);

                return response.json(await this.controller.getLembretes(idUsuario));
            } catch (error) {
                next(error);
            }
        });

        // Rota para criar um novo lembrete
        server.post(`${this.pathLembretes}`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
            try {
                const idUsuario = String(request.headers.idUsuario);
                const criaLembrete: InputCriarLembrete = {
                    data: request.body.data,
                    titulo: request.body.titulo,
                    descricao: request.body.descricao,
                    recorrente: request.body.dataHora,
                    intervaloRecorrencia: request.body.intervaloRecorrencia,
                };
                const novoLembrete = await this.controller.criaLembrete(criaLembrete, idUsuario);

                return response.json(novoLembrete);
            } catch (error) {
                next(error);
            }
        });

        // Rota para atualizar um lembrete
        server.put(`${this.pathLembretes}/:id`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
            try {
                const idUsuario = String(request.headers.idUsuario);
                const atualizaLembrete: InputAtualizarLembrete = {
                    id: request.params.id,
                    data: request.body.data,
                    titulo: request.body.titulo,
                    descricao: request.body.descricao,
                    recorrente: request.body.dataHora,
                    intervaloRecorrencia: request.body.intervaloRecorrencia,
                };
                const lembreteAtualizado = await this.controller.atualizaLembrete(atualizaLembrete.id, atualizaLembrete, idUsuario);

                if (!lembreteAtualizado) {
                    return response.json({ msg: 'Lembrete não encontrado ou não autorizado.' });
                }
                response.json(lembreteAtualizado);
            } catch (error) {
                next(error);
            }
        });

        // Rota para deletar um lembrete
        server.delete(`${this.pathLembretes}/:id`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
            try {
                const idUsuario = String(request.headers.idUsuario);
                const deletaAgendamento: InputAtualizarLembrete = {
                    id: request.params.id,
                };
                const sucesso = await this.controller.deletaLembrete(deletaAgendamento.id, idUsuario);

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