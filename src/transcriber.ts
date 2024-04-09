import { TranscriptionError } from "./errors.js";
import fs from "fs"
import path from "path";

const transcriptionApiEndpoint = 'https://api.openai.com/v1/audio/transcriptions';

export async function transcribeAudio(filePath: string): Promise<string> {
    const formData = new FormData();
    const audioFile = await fs.openAsBlob(filePath);
    const fileName = path.basename(filePath);
    formData.append('file', audioFile, fileName);
    formData.append('model', 'whisper-1');

    try {
        const response = await fetch(transcriptionApiEndpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json() as any;
        return data.text || '';
    } catch (error: any) {
        if (error instanceof TranscriptionError) {
            throw error;
        }
        throw new TranscriptionError(`Unexpected error during transcription: ${error.message}`);
    }
}
