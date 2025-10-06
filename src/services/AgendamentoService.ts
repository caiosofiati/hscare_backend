import Agendamentos, { IAgendamentos } from '../models/Agendamentos';
import { InputCriarAgendamento } from '../models/interfaces/InputCriarAgendamento';
import { InputAtualizarAgendamento } from '../models/interfaces/InputAtualizarAgendamento';

export class AgendamentoService {

  // Busca todos os agendamentos do usuário.
  public async getAgendamentos(userId: string): Promise<IAgendamentos[]> {
    return Agendamentos.find({ userId }).sort({ data: 'asc' });
  }

  public async getPorId(agendamentoId: string, userId: string): Promise<IAgendamentos | null> {
    const agendamento = await Agendamentos.findById(agendamentoId);
    if (agendamento && agendamento.userId.toString() === userId) {
      return agendamento;
    }
    return null;
  }

  // Cria um novo agendamento.
  public async criaAgendamento(dados: InputCriarAgendamento, userId: string): Promise<IAgendamentos> {

    // Não permitir agendamentos em datas passadas
    if (new Date(dados.data) < new Date()) {
      throw new Error('Não é possível criar agendamentos em datas passadas.');
    }

    // Verificar conflito de horário
    const conflito = await Agendamentos.findOne({ userId, data: dados.data });

    if (conflito) {
      throw new Error('Já existe um agendamento marcado neste horário.');
    }

    // Se todas as regras passaram, cria o novo agendamento
    const novoAgendamento = new Agendamentos({
      ...dados,
      userId: userId,
    });

    return novoAgendamento.save();
  }

  // Atualiza um agendamento existente.
  public async atualizaAgendamento(agendamentoId: string, dados: InputAtualizarAgendamento, userId: string): Promise<IAgendamentos | null> {

    const AtualizaAgendamento = await this.getPorId(agendamentoId, userId);

    // Garante que um usuário só pode atualizar seus próprios agendamentos
    if (!AtualizaAgendamento) {
      return null;
    }

    return Agendamentos.findByIdAndUpdate(agendamentoId, dados, { new: true });
  }

  // Deleta um agendamento.
  public async deletaAgendamento(agendamentoId: string, userId: string): Promise<boolean> {

    const agendamentoExistente = await this.getPorId(agendamentoId, userId);

    // Garante que um usuário só pode deletar seus próprios agendamentos
    if (!agendamentoExistente) {
      return false;
    }

    await agendamentoExistente.deleteOne();
    return true;
  }
}

