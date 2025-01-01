import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository";



describe('log.repository.test', () => {
    
    
    const mockLogDatasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    
    const logRepository = new LogRepositoryImpl(mockLogDatasource);

    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    test('saveLog should call the datasource with arguments', async () => {

        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.low,
            origin: 'log.repository.test.ts'
        });

        await logRepository.saveLog(log);

        expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log);

    });

    test('getLogs should call the datasource with arguments', async () => {

        await logRepository.getLogs(LogSeverityLevel.low);

        expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(LogSeverityLevel.low);
        
    });
    
});