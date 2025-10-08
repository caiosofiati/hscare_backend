export interface InputFichaMedica {
    userId: string;
    tipoSanguineo?: string;
    alergias?: Array<string>;
    tabagismo?: boolean;
    drogas?: boolean;
    etilista?: boolean;
    tipoDieta?: string;
    doencaCronica?: Array<string>;
    medicamentos?: Array<string>;
}