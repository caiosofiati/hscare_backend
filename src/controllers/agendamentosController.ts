import { AgendamentoService } from '../services/AgendamentoService';
import { InputCriarAgendamento } from '../models/interfaces/InputCriarAgendamento';
import { InputAtualizarAgendamento } from '../models/interfaces/InputAtualizarAgendamento';
import { IAgendamentos } from '../models/Agendamentos';

export class AgendamentosController {
  private service: AgendamentoService;

  constructor({ service = new AgendamentoService() }) {
    this.service = service;
  }

  public async getAgendamentos(userId: string): Promise<IAgendamentos[]> {
    return this.service.getAgendamentos(userId);
  }

  public async criaAgendamento(dados: InputCriarAgendamento, userId: string): Promise<IAgendamentos> {
    return this.service.criaAgendamento(dados, userId);
  }

  public async atualizaAgendamento(agendamentoId: string, dados: InputAtualizarAgendamento, userId: string): Promise<IAgendamentos | null> {
    return this.service.atualizaAgendamento(agendamentoId, dados, userId);
  }

  public async deletaAgendamento(agendamentoId: string, userId: string): Promise<boolean> {
    return this.service.deletaAgendamento(agendamentoId, userId);
  }
}