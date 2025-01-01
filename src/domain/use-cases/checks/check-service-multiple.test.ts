import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";


describe('MultipleCheckService UseCase', () => {

    const logRepositoryMock1 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const logRepositoryMock2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const logRepositoryMock3 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    
    const successCallBack = jest.fn();
    const errorCallBack = jest.fn();
    
    const checkServiceMultiple = new CheckServiceMultiple(
        [logRepositoryMock1, logRepositoryMock2, logRepositoryMock3],
        successCallBack,
        errorCallBack,
    );

    beforeEach( () => {
        jest.clearAllMocks();
    });
    
    test('Should call successCallBack when fetch returns true', async () => {

        const wasOk = await checkServiceMultiple.execute('https://www.google.com');
        
                 expect(wasOk).toBe(true);
        
                 expect(successCallBack).toHaveBeenCalled();
                 expect(errorCallBack).not.toHaveBeenCalled();         
        
                 expect(logRepositoryMock1.saveLog).toHaveBeenCalledWith(
                    expect.any(LogEntity)
                 );
                 expect(logRepositoryMock2.saveLog).toHaveBeenCalledWith(
                    expect.any(LogEntity)
                 );
                 expect(logRepositoryMock3.saveLog).toHaveBeenCalledWith(
                    expect.any(LogEntity)
                 );
        
    });

    test('Should call errorCallBack when fetch returns false', async () => {

        const wasOk = await checkServiceMultiple.execute('https://sssswww.google.com');

        expect(wasOk).toBe(false);

        expect(successCallBack).not.toHaveBeenCalled();
        expect(errorCallBack).toHaveBeenCalled();         

        expect(logRepositoryMock1.saveLog).toHaveBeenCalledWith(
           expect.any(LogEntity)
        );
        expect(logRepositoryMock2.saveLog).toHaveBeenCalledWith(
           expect.any(LogEntity)
        );
        expect(logRepositoryMock3.saveLog).toHaveBeenCalledWith(
           expect.any(LogEntity)
        );
        
   });
    
});