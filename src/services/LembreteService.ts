import Lembretes, { ILembretes } from '../models/Lembretes';
import { InputCriarLembrete } from '../models/interfaces/InputCriarLembrete';
import { InputAtualizarLembrete } from '../models/interfaces/InputAtualizarLembrete';

export class LembreteService {

    // Busca todos os lembretes do usuário.
    public async getLembretes(userId: string): Promise<ILembretes[]> {
        return Lembretes.find({ userId }).sort({ data: 'asc' });
    }

    public async getPorId(lembreteId: string, userId: string): Promise<ILembretes | null> {
        const lembrete = await Lembretes.findById(lembreteId);

        if (lembrete && lembrete.userId.toString() === userId) {
            return lembrete;
        }
        return null;
    }

    // Cria um novo lembrete.
    public async criaLembrete(dadosLembrete: InputCriarLembrete, userId: string): Promise<ILembretes> {

        if (!dadosLembrete.titulo) {
            throw new Error("O campo 'titulo' é obrigatório.");
        }

        const novoLembrete = new Lembretes({
            ...dadosLembrete,
            userId,
        });
        return novoLembrete.save();
    }

    // Atualiza um lembrete existente.
    public async atualizaLembrete(lembreteId: string, dadosLembrete: InputAtualizarLembrete, userId: string): Promise<ILembretes | null> {
        const lembreteExistente = await this.getPorId(lembreteId, userId);

        if (!lembreteExistente) {
            return null;
        }
        return Lembretes.findByIdAndUpdate(lembreteId, dadosLembrete, { new: true });
    }

    // Deleta um lembrete.
    public async deletaLembrete(lembreteId: string, userId: string): Promise<boolean> {
        const lembreteExistente = await this.getPorId(lembreteId, userId);

        if (!lembreteExistente) {
            return false;
        }
        await lembreteExistente.deleteOne();
        return true;
    }
}