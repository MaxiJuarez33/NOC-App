
export enum LogSeverityLevel {
    low    = 'low',
    medium = 'medium',
    high   = 'high',
}

export interface LogEntityOptions {
    level: LogSeverityLevel; // Enum
    message: string;
    createdAt?: Date;
    origin:  string;
}

export class LogEntity {
    public level: LogSeverityLevel; // Enum
    public message: string;
    public createdAt: Date;
    public origin:  string; // Para saber de que archivo salio el log


    
    constructor( options: LogEntityOptions ){
        const {message, level, origin, createdAt = new Date()} = options;
        this.message = message;
        this.level = level;
        this.origin = origin;
        this.createdAt = createdAt;


    }

    static fromJson = (json: string): LogEntity => {
        const {message, level, createdAt, origin} = JSON.parse(json);

        const log = new LogEntity({
            message,
            level,
            origin
        });
        log.createdAt = new Date(createdAt);

        return log;   
    }

    static fromObject = (object: {[key: string]: any}): LogEntity => {

        const {message, level, createdAt, origin} = object;
        const log = new LogEntity({
            message, level, origin, createdAt
        });

        return log;
    }

    
}

