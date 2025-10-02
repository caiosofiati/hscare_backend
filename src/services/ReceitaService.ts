import Receitas, { IReceitas } from '../models/Receitas';

// Interface para garantir que os dados de criação/atualização tenham o formato correto
interface ReceitaI {
    medico: string;
    crm?: string;
    dataEmissao: Date;
    dataValidade?: Date;
    medicamentos: { nome: string; dosagem?: string; instrucoes?: string; }[];
    cor?: string;
}

class ReceitaService {
    // Busca todas as receitas de um usuário específico
    public static async getReceitas(userId: string): Promise<IReceitas[]> {
        return Receitas.find({ userId }).sort({ dataEmissao: 'desc' });
    }

    // Cria uma nova receita
    public static async criaReceita(dados: ReceitaI, userId: string): Promise<IReceitas> {
    // Validar se a lista de medicamentos não está vazia
    if (!dados.medicamentos || dados.medicamentos.length === 0) {
        throw new Error('A receita deve conter pelo menos um medicamento.');
    }

    // Se as regras passaram, cria a nova receita
    const novaReceita = new Receitas({
        ...dados,
        userId: userId,
    });
    return novaReceita.save();
    }

    // Atualiza uma receita existente
    public static async atualizaReceita(receitaId: string, dados: Partial<ReceitaI>, userId: string): Promise<IReceitas | null> {
        const receita = await Receitas.findById(receitaId);

    // Garante que um usuário só pode atualizar suas próprias receitas
    if (!receita || receita.userId.toString() !== userId) {
        return null; 
    }

    return Receitas.findByIdAndUpdate(receitaId, dados, { new: true });
    }

    // Deleta uma receita existente
    public static async deletaReceita(receitaId: string, userId: string): Promise<boolean> {
        const receita = await Receitas.findById(receitaId);

    // Garante que um usuário só pode deletar suas próprias receitas
    if (!receita || receita.userId.toString() !== userId) {
        return false; 
    }

    await receita.deleteOne();
    return true; 
  }
}

export default ReceitaService;