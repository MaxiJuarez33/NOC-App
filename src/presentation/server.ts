import { CronJob } from "cron";
import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { envs } from "../config/plugins/envs.plugin";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);




export class Server {
    
    public static start() { // Estatico para usarse sin instanciar la clase

        // Mandar email

        // const emailService = new EmailService();
        // emailService.sendEmail({
        //     to: 'bicovez45@gmail.com',
        //     subject: 'Logs de sistema',
        //     htmlBody: `
        //     <h3>Logs de sistema - NOC</h3>
        //     <p> Lorem lslasloasdjas askdnasiodasdn jjewjiadsojiadsioadsioad jaidasjoid   </p>
        //     <p>Ver logs adjuntos</p>
        //     `
        // });
        
        
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://www.google.com';
        //         // const url = 'http://localhost:3000/posts';
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log(`${url} is ok`),
        //             (error) => console.error(error)
        //         ).execute(url);
        //     }
        // );
        
        
    }
    
}