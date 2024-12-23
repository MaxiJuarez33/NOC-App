import { CronJob } from "cron";
import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";


export class Server {
    
    public static start() { // Estatico para usarse sin instanciar la clase

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://www.google.com';
                new CheckService(
                    () => console.log(`${url} is ok`),
                    (error) => console.error(error)
                ).execute(url);
                // new CheckService().execute('http://localhost:3000/posts');
            }
        );
        
        
    }
    
}