import { LembreteService } from '../services/LembreteService';
import { InputCriarLembrete } from '../models/interfaces/InputCriarLembrete';
import { InputAtualizarLembrete } from '../models/interfaces/InputAtualizarLembrete';
import { ILembretes } from '../models/Lembretes';

export class LembretesController {
  private service: LembreteService;

  constructor({ service = new LembreteService() }) {
    this.service = service;
  }

  public async getLembretes(userId: string): Promise<ILembretes[]> {
    return this.service.getLembretes(userId);
  }

  public async criaLembrete(dados: InputCriarLembrete, userId: string): Promise<ILembretes> {
    return this.service.criaLembrete(dados, userId);
  }

  public async atualizaLembrete(lembreteId: string, dados: InputAtualizarLembrete, userId: string): Promise<ILembretes | null> {
    return this.service.atualizaLembrete(lembreteId, dados, userId);
  }

  public async deletaLembrete(lembreteId: string, userId: string): Promise<boolean> {
    return this.service.deletaLembrete(lembreteId, userId);
  }
}