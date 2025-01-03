import mongoose from "mongoose";
import { envs } from "../../../config/plugins/envs.plugin";
import { MongoDatabase } from "../init";
import { LogModel } from "./log.model";



describe('log.model.test.ts', () => {

    beforeAll( async () => {
        await MongoDatabase.connect({
            mongoURL: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME,
        });
    });

    afterEach( () => {
        mongoose.connection.close();
    });
    
    test('Should return LogModel', async () => {

       const logData = {
        origin: 'log.model.test.ts',
        message: 'test-message',
        level: 'low',
       };

       const log = await LogModel.create(logData);
       console.log(log);
        
       expect(log).toEqual(expect.objectContaining({
        ...logData,
        createdAt: expect.any(Date),
        id: expect.any(String),
       }));

       await LogModel.findByIdAndDelete(log.id);
       
    });


    test('Should return the schema object', () => {

        const schema = LogModel.schema.obj;

        expect(schema).toEqual(expect.objectContaining({
            message: { type: expect.any(Function), require: true },
            origin: { type: expect.any(Function) },
            level: {
              type: expect.any(Function),
              enum: [ 'low', 'medium', 'high' ],
              default: 'low'
            },
            createdAt: expect.any(Object),
          }));
        
        // console.log(schema);
        
    })
    
    
});