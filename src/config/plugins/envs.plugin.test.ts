import { envs } from "./envs.plugin";


describe('envs.plugin.ts', () => {
    test('Should return env options', () => {
        
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'who@google.com',
            MAILER_SECRET_KEY: '33juju',
            PROD: false,
            MONGO_URL: 'mongodb://estoes:33355677@localhost:27017',
            MONGO_DB_NAME: 'NOC-Test',
            MONGO_USER: 'estoes',
            MONGO_PASS: '33355677'   
        });
        
    });

    test('Should return error if not found env', async () => {
        jest.resetModules();
        process.env.PORT = 'abc';

        try {

            await import('./envs.plugin');
            expect(true).toBe(false);
            
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }
    });
});
