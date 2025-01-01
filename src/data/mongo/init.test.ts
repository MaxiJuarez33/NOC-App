import { connected } from "process";
import { MongoDatabase } from "./init";
import mongoose from "mongoose";



describe('init mongodb', () => {

    afterAll(()=> {
        mongoose.connection.close();
    })
    
    test('Should connect to mongodb', async () => {

        const connected = await MongoDatabase.connect({

            dbName: process.env.MONGO_DB_NAME!,
            mongoURL: process.env.MONGO_URL!,    
        });

        expect(connected).toBe(true);
        
    });


    test('Should throw an error', async () => {

        try {

            const connected = await MongoDatabase.connect({
                dbName: process.env.MONGO_DB_NAME!,
                mongoURL: 'dondees.com',
            });
            
            expect(true).toBe(false);
        } catch (error) {
            
            
            
        }
        
    });

});