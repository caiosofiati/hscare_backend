import { AuthService } from '../services/AuthService';
import { InputRegistrarUsuario } from '../models/interfaces/InputRegistrarUsuario';
import { OutputRegistrarUsuario } from '../models/interfaces/OutputRegistrarUsuario';

export class AuthController {
    private service: AuthService;

    constructor({ service = new AuthService() }) {
        this.service = service
    }

    async registrar(dadosUsuario: InputRegistrarUsuario): Promise<OutputRegistrarUsuario> {
        return this.service.registro(dadosUsuario);
    }

    async login(email: string, senha: string): Promise<any> {
        return this.service.login(email, senha);
    }
}
