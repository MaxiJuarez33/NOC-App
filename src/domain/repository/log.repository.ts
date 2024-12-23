// Esto es una interfaz que define los métodos que se pueden realizar sobre la entidad LogEntity.

import { LogEntity, LogSeverityLevel } from "../entities/log.entity";


export abstract class LogRepository {
    // datasource
    abstract saveLog(log: LogEntity): Promise<void>;
    abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}

