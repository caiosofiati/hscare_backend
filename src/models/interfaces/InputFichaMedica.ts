export interface InputFichaMedica {
    userId: string;
    tipoSanguineo?: string;
    alergias?: Array<string>;
    doencaCronica?: Array<string>;
    medicamentos?: Array<string>;
    doadorOrgaos?: boolean; //Add no BD
    dataNascimento?: Date; //Add no BD
    genero? : string; //Add no BD 
}