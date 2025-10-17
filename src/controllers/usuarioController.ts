import { UsuarioService } from '../services/UsuarioService';
import { IUsuario } from '../models/Usuario';

export class UsuarioController {
    private service: UsuarioService;

    constructor({ service = new UsuarioService() }) {
        this.service = service
    }

    async buscarUsuarioPorEmail(email: string): Promise<IUsuario | null> {
        return this.service.buscarUsuarioPorEmail(email);
    }

    async atualizarUsuario(idUsuario: string, dadosAtualizados: object): Promise<IUsuario | null> {
        return this.service.atualizarUsuario(idUsuario, dadosAtualizados);
    }

}