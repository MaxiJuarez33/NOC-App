import { LogEntity, LogSeverityLevel } from "./log.entity";



describe('log.entity.test.ts', () => {

    const dataObj = {
        message: 'test-message',
        level: LogSeverityLevel.high,
        origin: 'log.entity.test.ts',
    };

    test('Should create a LogEntity instance', () => {

        
        const log = new LogEntity({
            message: 'test-message',
            level: LogSeverityLevel.high,
            origin: 'log.entity.test.ts',
        });

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
        
    });

    test('Should create a LogEntity instance from json', () => {

        const json = `{"message":"Service https://www.google.com working...","level":"low","origin":"check-service.ts","createdAt":"2024-12-31T13:50:35.263Z"}`

        const log = LogEntity.fromJson(json);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe('Service https://www.google.com working...');
        expect(log.level).toBe(LogSeverityLevel.low);
        expect(log.origin).toBe('check-service.ts');
        expect(log.createdAt).toBeInstanceOf(Date);

    });

    test('Should create a LogEntity instance from object', () => {

        const log = LogEntity.fromObject(dataObj);
        
        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe('test-message');
        expect(log.level).toBe(LogSeverityLevel.high);
        expect(log.origin).toBe('log.entity.test.ts');
        expect(log.createdAt).toBeInstanceOf(Date);
        
    });
    
});