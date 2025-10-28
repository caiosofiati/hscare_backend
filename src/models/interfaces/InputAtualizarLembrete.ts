export interface InputAtualizarLembrete {
    id: string;
    data?: Date;
    titulo?: string;
    descricao?: string;
    recorrente?: boolean;
    intervaloRecorrencia?: number;
}