import FichaMedica, { IFichaMedica } from '../models/FichaMedica';

// Interface para os dados que podem ser salvos/atualizados
interface FichaMedicaI {
  tipoSanguineo?: string;
  alergias?: string;
  tabagismo?: boolean;
  drogas?: boolean;
  etilista?: boolean;
  tipoDieta?: string;
  doencaCronica?: string;
  medicamentos?: string;
}

class FichaMedicaService {
  // Busca a ficha médica pelo ID do usuário
  public async getFichaMedica(userId: string): Promise<IFichaMedica | null> {
    return FichaMedica.findOne({ userId });
  }

  // Cria ou atualiza a ficha médica do usuário
  public async criaOuAtualizaFichaMedica(dados: FichaMedicaI, userId: string): Promise<IFichaMedica> {
    const ficha = await FichaMedica.findOneAndUpdate(
      { userId: userId }, // Filtro para encontrar a ficha pelo userId
      { ...dados, userId: userId }, // Dados a serem atualizados ou inseridos
      { // Opções para retornar o documento atualizado ou criar um novo se não existir
        new: true,
        upsert: true, 
        setDefaultsOnInsert: true 
      }
    );
    return ficha;
  }
}

export default new FichaMedicaService();