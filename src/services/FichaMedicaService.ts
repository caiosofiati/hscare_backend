import FichaMedica, { IFichaMedica } from '../models/FichaMedica';
import { InputFichaMedica } from '../models/interfaces/InputFichaMedica';
import { ObjectId } from 'mongodb';

export class FichaMedicaService {

  public async getFichaMedica(userId: string): Promise<IFichaMedica | null> {
    return FichaMedica.findOne({ userId }).exec();
  }

  public async criarOuAtualizar(dados: InputFichaMedica, userId: string): Promise<IFichaMedica> {

    const ficha = await FichaMedica.findOneAndUpdate(
      { userId: new ObjectId(userId) },
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