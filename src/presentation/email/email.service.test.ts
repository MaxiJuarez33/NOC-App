import nodemailer from 'nodemailer';
import { EmailService, SendEmailOptions } from "./email.service";



describe('email.service.test', () => {

    const emailService = new EmailService();

    const mockSendMail = jest.fn();

    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    });
    
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Should send email', async () => {


        const options: SendEmailOptions = {
            to: 'who@gmail.com',
            subject: 'Testo',
            htmlBody: '<h1>Test</h1>'
        }

        await emailService.sendEmail(options);

        expect(mockSendMail).toHaveBeenCalledWith({
            "attachments": expect.any(Array),
            "html": "<h1>Test</h1>",
            "subject": "Testo",
            "to": "who@gmail.com",
        });
        
    });

    test('Should send email with attachments', async () => {

        const email = 'who@gmail.com';
        
        await emailService.sendEmailWithFileSystemLogs(email);

        expect(mockSendMail).toHaveBeenCalledWith({
            to: email,
            subject: "Logs del servidor",
            html: expect.any(String),
            attachments: expect.arrayContaining([
            {filename: 'logs-all.log', path: './logs/logs-all.log'},
            {filename: 'logs-high.log', path: './logs/logs-high.log'},
            {filename: 'logs-medium.log', path: './logs/logs-medium.log'}
            ]),
        });
        
    });
    
});