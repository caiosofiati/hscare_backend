import Lembretes, { ILembretes } from '../models/Lembretes';

// Interface para garantir que os dados de criação/atualização tenham o formato correto
interface LembreteDTO {
    data: Date;
    titulo: string;
    descricao?: string;
    recorrente?: boolean;
    intervaloRecorrencia?: number;
}

class LembreteService {
    //Busca todos os lembretes
    public async getLembretes(userId: string): Promise<ILembretes[]> {
        return Lembretes.find({ userId }).sort({ data: 'asc' });
    }

    // Cria um novo lembrete
    public async criaLembrete(dados: LembreteDTO, userId: string): Promise<ILembretes> {
    // Título deve ter no mínimo 3 caracteres
    if (!dados.titulo || dados.titulo.length < 3) {
        throw new Error('O título do lembrete deve ter pelo menos 3 caracteres.');
    }

    const novoLembrete = new Lembretes({
        ...dados,
        userId: userId,
    });
    return novoLembrete.save();
    }

    // Atualiza um lembrete existente
    public async atualizaLembrete(lembreteId: string, dados: Partial<LembreteDTO>, userId: string): Promise<ILembretes | null> {
        const lembrete = await Lembretes.findById(lembreteId);

    // Garante que um utilizador só pode atualizar os seus próprios lembretes
    if (!lembrete || lembrete.userId.toString() !== userId) {
        return null;
    }

    return Lembretes.findByIdAndUpdate(lembreteId, dados, { new: true });
    }

    // Deleta um lembrete
    public async deletaLembrete(lembreteId: string, userId: string): Promise<boolean> {
    const lembrete = await Lembretes.findById(lembreteId);

    //  Garante que um utilizador só pode deletar os seus próprios lembretes
    if (!lembrete || lembrete.userId.toString() !== userId) {
        return false;
    }

    await lembrete.deleteOne();
    return true;
    }
}

export default new LembreteService();