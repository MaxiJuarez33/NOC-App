import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


// const prismaSeverityLevel = SeverityLevel;

// const mapPrismaToNormal = (pSeverityLevel: SeverityLevel): LogSeverityLevel => {

//     return LogSeverityLevel[pSeverityLevel as keyof typeof LogSeverityLevel];

// }

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
}

const prismaClient = new PrismaClient();

export class PostgresLogDatasource implements LogDatasource {
    
    async saveLog(log: LogEntity): Promise<void> {

        const level = severityEnum[log.level];
        
        const newLog = await prismaClient.logModel.create({
            data: {
                level: level,
                message: log.message,
                origin: log.origin,
            }
        });

        console.log('Postgres log created', newLog.id);
        
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        const level = severityEnum[severityLevel];
        
        const logs = await prismaClient.logModel.findMany({
            where: {
                level: level,
            }
        });

        return logs.map(logs => LogEntity.fromObject(logs));
        
    }

}
