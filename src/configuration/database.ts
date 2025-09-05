import { connect } from 'mongoose';

export class Database {
    static async conectar() {
        try {
            await connect('URL DO MONGO');

            console.info('Conectado ao banco de dados com sucesso!');
        } catch (error) {
            console.error('Erro ao conectar ao banco de dados: ', error);
        };
    };
};