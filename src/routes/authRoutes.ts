import express from "express";
import { ApiRouter } from "./api.router";
import { AuthController } from "../controllers/authController";
import { InputRegistrarUsuario } from '../models/interfaces/InputRegistrarUsuario';

export class AuthApi extends ApiRouter {
    private readonly pathAuth: string;
    private readonly controller = new AuthController({});

    constructor() {
        super();
        this.pathAuth = "/auth";
    }

    public active(): boolean {
        return true;
    }

    public async applyRoutes(server: express.Application): Promise<void> {
        server.post(`${this.pathAuth}/registrar`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
           try {
               const dadosUsuario: InputRegistrarUsuario = {
                   nome: request.body.nome,
                   email: request.body.email,
                   cpf: request.body.cpf,
                   senha: request.body.senha,
               };

               return response.json(await this.controller.registrar(dadosUsuario));
               } catch (error) {
                   next(error);
               }
            });

        server.post(`${this.pathAuth}/login`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
           try {
               const dadosUsuario = {
                   email: request.body.email,
                   senha: request.body.senha,
               };

               return response.json(await this.controller.login(dadosUsuario.email, dadosUsuario.senha));
               } catch (error) {
                   next(error);
               }
            });
        }
    }