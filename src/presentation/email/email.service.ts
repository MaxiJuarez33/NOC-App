import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { Attachment } from 'nodemailer/lib/mailer';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';


interface SendEmailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

interface Attachement {
    filename: string;
    path: string;
}

// TODO: Attachement

export class EmailService {
    
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });

    constructor() {}

    async sendEmail(options: SendEmailOptions): Promise<Boolean> {

        const {to, subject, htmlBody, attachments = []} = options;
        
        try {
            
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments,
            });

            // console.log(sentInformation)
            

            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message:'Email sent',
                origin: 'email.service.ts'
            });
            
            return true;
        } catch (error) {

            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message:'Email not sent',
                origin: 'email.service.ts'
            });

            return false;
        }

    }

    async sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = 'Logs del servidor';
        const htmlBody = `
            <h3>Logs de sistema - NOC</h3>
            <p> Estos logs son del dia de la fecha, incluye todos los logs que pasaron, no está filtrado por alto medio o bajo</p>
            <p>Ver logs adjuntos</p>
        `;

        const attachments: Attachment[] = [
            {filename: 'logs-all.log', path: './logs/logs-all.log'},
            {filename: 'logs-high.log', path: './logs/logs-high.log'},
            {filename: 'logs-medium.log', path: './logs/logs-medium.log'},
        ];

        return this.sendEmail({
            to, subject, attachments, htmlBody
        });

    }
    
}
