import express from 'express';
import { ApiRouter } from './api.router';
import { AgendamentosController } from '../controllers/agendamentosController';
import { InputCriarAgendamento } from '../models/interfaces/InputCriarAgendamento';
import { InputAtualizarAgendamento } from '../models/interfaces/InputAtualizarAgendamento';

export class AgendamentosApi extends ApiRouter {
    private readonly pathAgendamentos: string;
    private readonly controller = new AgendamentosController({});

    constructor() {
        super();
        this.pathAgendamentos = "/agendamentos";
    }

    public active(): boolean {
        return true;
    }

    public async applyRoutes(server: express.Application): Promise<void> {

        // Rota para buscar todos os agendamentos
        server.get(`${this.pathAgendamentos}`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
            try {
                const idUsuario = String(response.getHeader('idUsuario'));

                return response.json(await this.controller.getAgendamentos(idUsuario));
            } catch (error) {
                next(error);
            }
        });

        // Rota para criar um novo agendamento
        server.post(`${this.pathAgendamentos}`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
            try {
                const idUsuario = String(response.getHeader('idUsuario'));
                const criaAgendamento: InputCriarAgendamento = {
                    titulo: request.body.titulo,
                    data: request.body.data,
                    local: request.body.local,
                    descricao: request.body.descricao,
                };
                const agendamentoCriado = await this.controller.criaAgendamento(criaAgendamento, idUsuario);

                return response.json(agendamentoCriado);
            } catch (error) {
                next(error);
            }
        });

        // Rota para atualizar um agendamento
        server.put(`${this.pathAgendamentos}/:id`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
            try {
                const idUsuario = String(response.getHeader('idUsuario'));
                const atualizaAgendamento: InputAtualizarAgendamento = {
                    id: request.params.id,
                    titulo: request.body.titulo,
                    data: request.body.data,
                    local: request.body.local,
                    descricao: request.body.descricao,
                };
                const agendamentoAtualizado = await this.controller.atualizaAgendamento(atualizaAgendamento.id, atualizaAgendamento, idUsuario);

                if (!agendamentoAtualizado) {
                    return response.status(404).json({ msg: 'Agendamento não encontrado ou não autorizado.' });
                }
                return response.json(agendamentoAtualizado);
            } catch (error) {
                next(error);
            }
        });

        // Rota para deletar um agendamento
        server.delete(`${this.pathAgendamentos}/:id`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
            try {
                const idUsuario = String(response.getHeader('idUsuario'));
                const deletaAgendamento: InputAtualizarAgendamento = {
                    id: request.params.id,
                };
                const sucesso = await this.controller.deletaAgendamento(deletaAgendamento.id, idUsuario);

                if (!sucesso) {
                    return response.status(404).json({ msg: 'Agendamento não encontrado ou não autorizado.' });
                }
                response.json({ msg: 'Agendamento removido com sucesso.' });
            } catch (error) {
                next(error);
            }
        });
    }
}