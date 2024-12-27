import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";

(async() => {
    main();
})();


async function main() {
    await MongoDatabase.connect({
        mongoURL: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });

    // Crear una coleccion = tables, documento = registro
    // const newLog = await LogModel.create({
    //     message: 'Test message from mongo',
    //     origin: 'App.ts',
    //     level: 'low',
    // });

    // await newLog.save();

    // console.log(newLog);
    

    // const logs = await LogModel.find();
    // console.log(logs);
    
    
    // Server.start();
}