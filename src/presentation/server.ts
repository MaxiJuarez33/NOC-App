import { CronJob } from "cron";
import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { envs } from "../config/plugins/envs.plugin";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-logs";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);

const emailService = new EmailService();



export class Server {
    
    public static start() { // Estatico para usarse sin instanciar la clase

        // emailService.sendEmailWithFileSystemLogs('bicovez45@gmail.com');
        
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute(
        //     'bicovez45@gmail.com',
        // );
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