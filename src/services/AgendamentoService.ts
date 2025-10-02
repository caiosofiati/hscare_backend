import Agendamentos, { IAgendamentos } from '../models/Agendamentos';

interface CriaAgendamentoI {
  titulo: string;
  data: Date;
  local?: string;
  descricao?: string;
}

class AgendamentoService {
  
    // Busca todos os agendamentos de um usuário específico.
    public static async getAgendamentos(userId: string): Promise<IAgendamentos[]> {
        return Agendamentos.find({ userId }).sort({ data: 'asc' });
    }
    
    // Cria um novo agendamento.
    public static async criaAgendamento(dados: CriaAgendamentoI, userId: string): Promise<IAgendamentos> {
        // Não permitir agendamentos em datas passadas
        if (new Date(dados.data) < new Date()) {
        throw new Error('Não é possível criar agendamentos em datas passadas.');
        }

    // Verificar conflito de horário
    const conflito = await Agendamentos.findOne({ userId, data: dados.data });
        if (conflito) {
        throw new Error('Já existe um agendamento marcado exatamente neste horário.');
    }

    // Se todas as regras passaram, cria o novo agendamento
    const novoAgendamento = new Agendamentos({
        ...dados,
        userId: userId,
    });
    
    return novoAgendamento.save();
  }

    // Atualiza um agendamento existente.
    public static async atualizaAgendamento(agendamentoId: string, dados: Partial<CriaAgendamentoI>, userId: string): Promise<IAgendamentos | null> {
        const agendamento = await Agendamentos.findById(agendamentoId);

    // Garante que um usuário só pode atualizar seus próprios agendamentos
    if (!agendamento || agendamento.userId.toString() !== userId) {
        return null;
    }

    return Agendamentos.findByIdAndUpdate(agendamentoId, dados, { new: true });
  }
  
    // Deleta um agendamento.
    public static async deletaAgendamento(agendamentoId: string, userId: string): Promise<boolean> {
    const agendamento = await Agendamentos.findById(agendamentoId);

    // Garante que um usuário só pode deletar seus próprios agendamentos
    if (!agendamento || agendamento.userId.toString() !== userId) {
        return false; 
    }

    await agendamento.deleteOne();
    return true;
  }
}

export default AgendamentoService;