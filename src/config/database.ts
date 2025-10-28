import mongoose from 'mongoose';
import logger from '../utils/logger';

class Database {
    static async conectar(): Promise<void> {
        try {
            await mongoose.connect(process.env.MONGO_AC || '');

            logger.info(`MongoDB conectado com sucesso.`);
        } catch (error) {
            logger.error(error);
        }

    }
}

export default Database;
