import { mkdir, writeFile } from 'fs/promises';

import dotenv from 'dotenv';
import winston from 'winston';

export function setupEnvironment(): void {
    dotenv.config();
}

export async function writeToFile(filePath: string, content: string): Promise<void> {
    const controller = new AbortController();
    const { signal } = controller;
    const data = new Uint8Array(Buffer.from(content));
    const promise = writeFile(filePath, data, { signal });

    await promise;
}

export async function createDirectoryIfNotExist(directoryPath: string): Promise<void> {
    try {
        const projectFolder = new URL(directoryPath, import.meta.url);
        await mkdir(projectFolder, { recursive: true });
    } catch (err: any) {
        if (err.code !== 'EEXIST') {
            throw err;
        }
    }
}

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.printf(info => `${info.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf(info => `${info.level}: ${info.message}`)
            )
        })
    ]
});