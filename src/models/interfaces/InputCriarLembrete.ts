export interface InputCriarLembrete {
    data: Date;
    titulo: string;
    descricao?: string;
    recorrente?: boolean;
    intervaloRecorrencia?: number;
}