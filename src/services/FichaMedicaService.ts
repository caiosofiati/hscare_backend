import FichaMedica, { IFichaMedica } from '../models/FichaMedica';
import { InputFichaMedica } from '../models/interfaces/InputFichaMedica';
import { ObjectId } from 'mongodb';
import logger from '../utils/logger';

export class FichaMedicaService {

  public async getFichaMedica(userId: string): Promise<IFichaMedica | null> {
    logger.info(`Buscando ficha médica do usuário ${userId}`);

    return FichaMedica.findOne({ userId }).exec();
  }

  public async criarOuAtualizar(dados: InputFichaMedica, userId: string): Promise<IFichaMedica> {
    logger.info(`Ajustando ficha médica do usuário ${userId}`);

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