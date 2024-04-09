# Voicely: Audio Transcription and Summarization CLI Tool

Voicely is a CLI tool that automates the process of transcribing audio files and summarizing the transcriptions. Leveraging the power of OpenAI's APIs, Voicely provides a streamlined workflow for turning audio content into concise, written summaries.

## Features

- **Audio Transcription**: Converts speech in audio files into text.
- **Text Summarization**: Generates concise summaries from the transcribed text.

## Installation

Ensure you have [Node.js](https://nodejs.org/) installed (version 14.x or higher is recommended).

Voicely can be installed globally on your system, allowing you to use it from any directory.

```bash
npm install -g voicely
```

## Environment Setup

Before using Voicely, you must set up the OpenAI API key as an environment variable:

### Unix-based Systems (Linux/macOS)

```bash
export OPENAI_API_KEY=your_openai_api_key_here
```

### Windows

In Command Prompt:

```shell
set OPENAI_API_KEY=your_openai_api_key_here
```

Alternatively, you can provide the API key directly in the command line for one-off uses:

```bash
OPENAI_API_KEY=your_openai_api_key_here voicely -f /path/to/audio.mp3
```

## Usage

Once installed, you can run Voicely using the following command:

```bash
voicely -f /path/to/audio/file.mp3 -o /path/to/output/directory
```

**Options**

-f, --file <path>: (Required) Path to the audio file you want to transcribe.
-o, --output <path>: (Optional) Output directory for the transcript and summary files. Defaults to the current directory.

## Contributing

Contributions to improve the tool are welcome.

## License

This project is licensed under the MIT License.

## Acknowledgments

Voicely relies on OpenAI's powerful APIs for audio transcription and text summarization. Users are encouraged to adhere to OpenAI's usage policies and terms.
