import fs from 'fs';
import path from 'path';
import { FileSystemDatasource } from './file-system.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';


describe('file-system.datasource.test.ts', () => {

    const logPath = path.join(__dirname, '../../../logs')
    
    beforeEach(() => {

        fs.rmSync(logPath, {recursive:true, force: true});

    });
    
    test('Should create log file if the dont exists', () => {

        new FileSystemDatasource();

        const files = fs.readdirSync(logPath);
        expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log']);
        
    });

    test('Should save a log in logs-all.log', () => {

        const logDatasource = new FileSystemDatasource();
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test'
        });

        logDatasource.saveLog(log);

        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');

        expect(allLogs).toContain(JSON.stringify(log));
        
    });

    test('Should save a log in logs-all.log and logs-medium', () => {

        const logDatasource = new FileSystemDatasource();
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test'
        });

        logDatasource.saveLog(log);

        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');

        expect(allLogs).toContain(JSON.stringify(log));
        expect(mediumLogs).toContain(JSON.stringify(log));
        
    });

    test('Should save a log in logs-all.log and logs-high.log', () => {

        const logDatasource = new FileSystemDatasource();
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test'
        });

        logDatasource.saveLog(log);

        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');

        expect(allLogs).toContain(JSON.stringify(log));
        expect(highLogs).toContain(JSON.stringify(log));
        
    });

    test('Should return all logs', async () => {

        const logDatasource = new FileSystemDatasource();

        const logLow = new LogEntity({
            message: 'logLow',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test'
        });
        const mediumLog = new LogEntity({
            message: 'mediumLog',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test'
        });
        const highLog = new LogEntity({
            message: 'highLog',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test'
        });

        await logDatasource.saveLog(logLow);
        await logDatasource.saveLog(mediumLog);
        await logDatasource.saveLog(highLog);

        const logsLow = await logDatasource.getLogs(LogSeverityLevel.low);
        const logsMedium = await logDatasource.getLogs(LogSeverityLevel.medium);
        const logsHigh = await logDatasource.getLogs(LogSeverityLevel.high);

        expect(logsLow).toEqual(expect.arrayContaining([logLow, mediumLog, highLog]));
        expect(logsMedium).toEqual(expect.arrayContaining([ mediumLog ]));
        expect(logsHigh).toEqual(expect.arrayContaining([ highLog ]));
        
        
    });
    
    
});