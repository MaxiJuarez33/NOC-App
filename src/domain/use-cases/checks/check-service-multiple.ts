import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

const fileName = 'check-service.ts';

interface CheckServiceMultipleUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallBack = () => void;
type ErrorCallBack = (error: string) => void;


export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallBack: SuccessCallBack,
        private readonly errorCallBack: ErrorCallBack) 
        {}

    private callLogs(log: LogEntity) {
        this.logRepository.forEach(logRepository => {
            logRepository.saveLog(log);
        });
    }
    
    public async execute(url: string): Promise<boolean> {
        
        try {

            const req = await fetch(url);
            
            if (!req.ok){
                throw new Error(`Error on check service: ${url}`);
            }
            
            const log = new LogEntity({
                message: `Service ${url} working...`,
                level: LogSeverityLevel.low,
                origin: fileName
            });
            this.callLogs(log);
            this.successCallBack();
            return true;
        } catch (error) {
            const errorMessage = `${url} is down. ${error}`
            const log = new LogEntity({
                message: errorMessage, 
                level: LogSeverityLevel.high,
                origin: fileName
            });

            this.callLogs(log);
            this.errorCallBack(errorMessage);
            return false;
        }
    }
}