#!/usr/bin/env node

import { SummarizationError, TranscriptionError } from './errors.js';
import { createDirectoryIfNotExist, logger, setupEnvironment, writeToFile } from './utils.js';

import { Command } from 'commander';
import path from 'path';
import { summarizeText } from './summarizer.js';
import { transcribeAudio } from './transcriber.js';

setupEnvironment();

const program = new Command();

program
    .name("voicely")
    .description("CLI tool to transcribe audio files and summarize the transcriptions.")
    .version("1.0.0")
    .usage("[options] -f <audio file>")
    .option('-f, --file <path>', 'Path to the audio file to transcribe.')
    .option('-o, --output <path>', 'Output directory for the transcript and summary files, defaults to the current directory.', process.cwd())
    .addHelpText('after', `
Example:
    $ voicely -f /path/to/audio.mp3
    $ voicely -f /path/to/audio.mp3 -o /path/to/output

Providing the OpenAI API Key:
    The OpenAI API key is required for transcribing and summarizing audio files. You can provide the API key in two ways:

    1. As an environment variable (recommended for security and convenience):
       - On Unix-based systems (Linux/macOS), you can set the API key temporarily for the current terminal session:
         $ export OPENAI_API_KEY=your_openai_api_key_here
       - On Windows Command Prompt, you can set the API key temporarily for the current terminal session:
         > set OPENAI_API_KEY=your_openai_api_key_here
       - Alternatively, you can add the export or set command to your shell's startup script (.bashrc, .zshrc, etc.) for persistence across sessions.

    2. Directly in the command line when running voicely (useful for one-off uses):
       $ OPENAI_API_KEY=your_openai_api_key_here voicely --file /path/to/audio.mp3

Replace 'your_openai_api_key_here' with your actual OpenAI API key. Be cautious when using the API key directly in the command line, as it may be stored in your command history.

This tool automates the process of transcribing audio files and summarizing the transcriptions, utilizing OpenAI APIs for both tasks. Ensure your API key is set as environment variable before running.
`)
    .action(async (options) => {
        if (!options.file) {
            program.help();
        }

        // Ensure the OpenAI API key is provided
        if (!process.env.OPENAI_API_KEY) {
            logger.error("The OPENAI_API_KEY environment variable is not set.");
            process.exit(1);
        }

        try {
            const { file, output } = options;
            const outputPath = path.resolve(output);
            await createDirectoryIfNotExist(outputPath);
            logger.info('Starting transcription...');
            const transcript = await transcribeAudio(file);
            const summary = await summarizeText(transcript);
            const baseFilename = path.basename(file, path.extname(file));
            await writeToFile(path.join(outputPath, `${baseFilename}-transcript.txt`), transcript);
            await writeToFile(path.join(outputPath, `${baseFilename}-summary.md`), summary);
            logger.info(`Transcription and summary have been saved to ${outputPath}`);
        } catch (error: any) {
            if (error instanceof TranscriptionError) {
                logger.error(`Transcription failed: ${error.message}`);
            } else if (error instanceof SummarizationError) {
                logger.error(`Summarization failed: ${error.message}`);
            } else {
                logger.error(`An unexpected error occurred: ${error.message}`);
            }
            process.exit(1);
        }
    });

program.parse(process.argv);
