import Agendamentos, { IAgendamentos } from '../models/Agendamentos';
import { InputCriarAgendamento } from '../models/interfaces/InputCriarAgendamento';
import { InputAtualizarAgendamento } from '../models/interfaces/InputAtualizarAgendamento';
import logger from '../utils/logger';

export class AgendamentoService {

  public async getAgendamentos(userId: string): Promise<IAgendamentos[]> {
    logger.info(`Buscando agendamentos para o usuario ${userId}`);

    return Agendamentos.find({ userId }).sort({ data: 'asc' });
  }

  public async getPorId(agendamentoId: string, userId: string): Promise<IAgendamentos | null> {
    logger.info(`Buscando agendamento de id ${agendamentoId}, para o usuario ${userId}`);

    const agendamento = await Agendamentos.findById(agendamentoId);
    if (agendamento && agendamento.userId.toString() === userId) {
      return agendamento;
    }
    return null;
  }

  public async criaAgendamento(dados: InputCriarAgendamento, userId: string): Promise<IAgendamentos> {
  logger.info(`Criando agendamento para o usuario ${userId}`);

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

  public async atualizaAgendamento(agendamentoId: string, dados: InputAtualizarAgendamento, userId: string): Promise<IAgendamentos | null> {
  logger.info(`Atualizando agendamento ${agendamentoId} para o usuario ${userId}`);

    const AtualizaAgendamento = await this.getPorId(agendamentoId, userId);

    if (!AtualizaAgendamento) {
      return null;
    }

    return Agendamentos.findByIdAndUpdate(agendamentoId, dados, { new: true });
  }

  public async deletaAgendamento(agendamentoId: string, userId: string): Promise<boolean> {
    logger.info(`Deletando agendamento de id ${agendamentoId} do usuario ${userId}`);

    const agendamentoExistente = await this.getPorId(agendamentoId, userId);

    if (!agendamentoExistente) {
      return false;
    }

    await agendamentoExistente.deleteOne();
    return true;
  }
}

