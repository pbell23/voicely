#!/usr/bin/env node

import { createDirectoryIfNotExist, logger, setupEnvironment, writeToFile } from './utils.js';
import { getApiKey, setApiKey, unsetApiKey } from './config.js';

import { Command } from 'commander';
import { checkAudioSizeAndSplit } from './audioHandler.js';
import fs from 'fs';
import path from 'path';
import { summarizeText } from './summarizer.js';
import { transcribeAudio } from './transcriber.js';

setupEnvironment();

const program = new Command();

program
    .name("voicely")
    .description("CLI tool to transcribe audio files and summarize the transcriptions, with optional context for summaries.")
    .version("1.1.5");

program
    .command('set-api-key <key>')
    .description('Set the OpenAI API key.')
    .action((key: string) => {
        setApiKey(key);
        logger.info('API key set successfully.');
    });

program
    .command('unset-api-key')
    .description('Unset the OpenAI API key.')
    .action(() => {
        unsetApiKey();
        logger.info('API key unset successfully.');
    });

program
    .command('process')
    .requiredOption('-f, --file <path>', 'Path to the audio file to transcribe or text file to summarize.')
    .option('-o, --output <path>', 'Output directory for the transcript and summary files, defaults to the current directory.', process.cwd())
    .option('-c, --context <text>', 'Context text to be considered during the summarization process.')
    .option('-C, --context-file <path>', 'Path to a text file containing context to be considered during the summarization process.')
    .action(async (options: { file: string; output?: string; context?: string; contextFile?: string }) => {
        if (!options.file) {
            program.help();
        }

        const apiKey = getApiKey();
        if (!apiKey) {
            logger.error('API key is not set. Please set it using the `set-api-key` command.');
            process.exit(1);
        }

        const { file, output = process.cwd(), context = '', contextFile } = options;
        let fullContext: string = context;

        if (contextFile) {
            try {
                fullContext = fs.readFileSync(contextFile, 'utf8');
            } catch (err: any) {
                logger.error(`Failed to read context file: ${err.message}`);
                process.exit(1);
            }
        }

        const outputPath: string = path.resolve(output);
        await createDirectoryIfNotExist(outputPath);
        const baseFilename: string = path.basename(file, path.extname(file));

        try {
            logger.info('Starting processing...');
            const files = await checkAudioSizeAndSplit(file);
            let fullTranscript = '';

            for (const f of files) {
                const transcript = await transcribeAudio(f, apiKey); // Pass the apiKey to the transcribeAudio function
                fullTranscript += transcript + ' ';
            }

            const transcriptFile = path.join(outputPath, `${baseFilename}-transcript.txt`);
            await writeToFile(transcriptFile, fullTranscript.trim());

            const summary = await summarizeText(fullTranscript, fullContext);
            await writeToFile(path.join(outputPath, `${baseFilename}-summary.md`), summary);

            logger.info('Processing completed successfully.');
        } catch (error: any) {
            logger.error(`An error occurred: ${error.message}`);
            process.exit(1);
        }
    });

program.parse(process.argv);
