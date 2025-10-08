import { FichaMedicaService } from '../services/FichaMedicaService';
import { InputFichaMedica } from '../models/interfaces/InputFichaMedica';
import { IFichaMedica } from '../models/FichaMedica';

export class FichaMedicaController {
  private service: FichaMedicaService;

  constructor({ service = new FichaMedicaService() }) {
    this.service = service;
  }

  public async getFichaMedica(userId: string): Promise<IFichaMedica | null> {
    return this.service.getFichaMedica(userId);
  }

  public async criarOuAtualizar(dados: InputFichaMedica, userId: string): Promise<IFichaMedica> {
    return this.service.criarOuAtualizar(dados, userId);
  }
}