import { CronJob } from "cron";
import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";


export class Server {
    
    public static start() { // Estatico para usarse sin instanciar la clase

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                new CheckService().execute('https://www.google.com');
            }
        );
        
        
    }
    
}