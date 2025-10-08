import FichaMedica, { IFichaMedica } from '../models/FichaMedica';
import { InputFichaMedica } from '../models/interfaces/InputFichaMedica';

export class FichaMedicaService {

  public async getFichaMedica(userId: string): Promise<IFichaMedica | null> {
    return FichaMedica.findOne({ userId });
  }

  public async criarOuAtualizar(dados: InputFichaMedica, userId: string): Promise<IFichaMedica> {

    const ficha = await FichaMedica.findOneAndUpdate(
      { userId: userId },
      { ...dados, userId: userId },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
      }
    );
    return ficha;
  }
}