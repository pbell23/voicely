import { MAX_AUDIO_SIZE } from './config.js';
import { exec } from 'child_process';
import fs from 'fs';
import { logger } from './utils.js';
import path from 'path';

export function checkAudioSizeAndSplit(file: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.stat(file, (err, stats) => {
            if (err) {
                return reject(err);
            }

            if (stats.size <= MAX_AUDIO_SIZE) {
                resolve([file]);  // No need to split
            } else {
                // Splitting the file using FFmpeg
                const outputFilePattern = path.join(path.dirname(file), 'split_%03d.mp3');
                const command = `ffmpeg -i "${file}" -f segment -segment_time 300 -c copy "${outputFilePattern}"`;

                exec(command, (error, stdout, stderr) => {
                    if (error) {
                        logger.error(`Failed to split the audio file: ${error.message}`);
                        return reject(error);
                    }

                    const splitFiles = fs.readdirSync(path.dirname(file)).filter(f => f.startsWith('split_')).map(f => path.join(path.dirname(file), f));
                    resolve(splitFiles);
                });
            }
        });
    });
}
