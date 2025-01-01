import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
import { SendEmailLogs } from "./send-logs";



describe('sendEmailLogs', () => {

    const emailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
    }
    const logRepository: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    
    const sendEmail = new SendEmailLogs(
        emailService as any,
        logRepository,
    );

    beforeEach( () => {
        jest.clearAllMocks();
    });
    
    test('Should call sendEmail and saveLog', async () => {

        const result = await sendEmail.execute('maxique@google.com');

        expect(result).toBe(true);
        expect(emailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(logRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(logRepository.saveLog).toHaveBeenCalledWith({
            "createdAt": expect.any(Date),
            "level": "low",
            "message": "Log email sent",
            "origin": "send-logs.ts",
        });
    });

    
    test('Should log in case of error', async () => {

        emailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);
        
        const result = await sendEmail.execute('maxique@google.com');

        expect(result).toBe(false);
        expect(emailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(logRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(logRepository.saveLog).toHaveBeenCalledWith({
            "createdAt": expect.any(Date),
            "level": "high",
            "message": "Error: Email log not sent",
            "origin": "send-logs.ts",
        });
    });
    
});