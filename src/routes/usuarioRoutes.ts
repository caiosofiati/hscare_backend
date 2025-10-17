import express from "express";
import { ApiRouter } from "./api.router";
import { UsuarioController } from "../controllers/usuarioController";

export class UsuarioApi extends ApiRouter {
    private readonly pathUsuario: string;
    private readonly controller = new UsuarioController({});

    constructor() {
        super();
        this.pathUsuario = "/usuario";
    }

    public active(): boolean {
        return true;
    }

    public async applyRoutes(server: express.Application): Promise<void> {
        server.get(`${this.pathUsuario}/buscarPorEmail`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
           try {
               const email = String(request.headers.email);

               return response.json(await this.controller.buscarUsuarioPorEmail(email));
               } catch (error) {
                   next(error);
               }
            });

        server.post(`${this.pathUsuario}/atualizar`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
           try {
               const idUsuario = String(request.headers.idUsuario);

               // Adicionar os dados que precisa para atualizar aqui.
               const dadosAtualizadosDoUsuario = {
                idUsuario: String(request.body._id),
                nome: request.body.nome,
                email: request.body.email,
                telefone: request.body.telefone,
                cpf: request.body.cpf,
                endereco: request.body.endereco,
                contatos: request.body.contatos,
               };

               return response.json(await this.controller.atualizarUsuario(dadosAtualizadosDoUsuario.idUsuario, dadosAtualizadosDoUsuario));
               } catch (error) {
                   next(error);
               }
            });
        }
    }