import Lembretes, { ILembretes } from '../models/Lembretes';
import { InputCriarLembrete } from '../models/interfaces/InputCriarLembrete';
import { InputAtualizarLembrete } from '../models/interfaces/InputAtualizarLembrete';
import { ObjectId } from 'mongodb';

export class LembreteService {

    public async buscarLembretes(idUsuario: string): Promise<ILembretes[]> {
        return Lembretes.find({ idUsuario: new ObjectId(idUsuario) }).sort({ data: 'asc' });
    }

    public async getPorId(lembreteId: string, idUsuario: string): Promise<ILembretes | null> {
        const lembrete = await Lembretes.findById(lembreteId);

        if (lembrete && lembrete.idUsuario.toString() === idUsuario) {
            return lembrete;
        }

        return null;
    }

    public async criaLembrete(dadosLembrete: InputCriarLembrete, idUsuario: string): Promise<ILembretes> {

        if (!dadosLembrete.titulo) {
            throw new Error("O campo 'titulo' é obrigatório.");
        }

        const novoLembrete = new Lembretes({
            ...dadosLembrete,
            idUsuario: new ObjectId(idUsuario),
        });

        return novoLembrete.save();
    }

    public async deletaLembrete(lembreteId: string, userId: string): Promise<boolean> {
        const lembreteExistente = await this.getPorId(lembreteId, userId);

        if (!lembreteExistente) {
            return false;
        }
        await lembreteExistente.deleteOne();
        return true;
    }
}