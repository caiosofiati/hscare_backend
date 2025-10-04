import mongoose from 'mongoose';

class Database {
    static async conectar(): Promise<void> {
        try {
            await mongoose.connect(process.env.MONGO_AC || '');

            console.log('Mongo DB conecatado !');
        } catch (error) {
            console.error(error);
        }

    }
}

export default Database;
