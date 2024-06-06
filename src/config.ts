import fs from 'fs';
import os from 'os';
import path from 'path';

export const MAX_AUDIO_SIZE = 25 * 1024 * 1024; // 25 MB

const CONFIG_FILE_PATH = path.join(os.homedir(), '.voicelyrc');

export function setApiKey(apiKey: string): void {
    const config = { apiKey };
    fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(config, null, 2), 'utf-8');
}

export function unsetApiKey(): void {
    if (fs.existsSync(CONFIG_FILE_PATH)) {
        fs.unlinkSync(CONFIG_FILE_PATH);
    }
}

export function getApiKey(): string | null {
    if (fs.existsSync(CONFIG_FILE_PATH)) {
        const config = JSON.parse(fs.readFileSync(CONFIG_FILE_PATH, 'utf-8'));
        return config.apiKey;
    }
    return null;
}
