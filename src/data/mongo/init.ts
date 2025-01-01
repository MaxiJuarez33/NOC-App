import mongoose, { mongo } from "mongoose";

interface ConnectionOptions {
    mongoURL: string;
    dbName: string;
}

export class MongoDatabase {

    static async connect(options: ConnectionOptions) {
        const {mongoURL, dbName} = options;

        try {
            await mongoose.connect(mongoURL, {
                dbName
            });

            // console.log('Mongo connected')
            
            return true;
        } catch (error) {
            // console.log('Mongo connection error');
            throw error;

            // return false;
        }

    }
}

