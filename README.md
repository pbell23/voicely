# Voicely: Audio Transcription and Summarization CLI Tool

Voicely is a CLI tool that automates the process of transcribing audio files and summarizing the transcriptions. Leveraging the power of OpenAI's APIs, Voicely provides a streamlined workflow for turning audio content into concise, written summaries.

## Features

- **Audio Transcription**: Converts speech in audio files into text.
- **Text Summarization**: Generates concise summaries from the transcribed text.

## Quick Start

1. Obtain an OpenAI API Key: Visit [OpenAI's API platform](https://platform.openai.com/api-keys) to generate your API key. Ensure you have sufficient credit, as API usage may incur costs.

2. Install Voicely Globally:

```bash
npm install -g voicely
```

3. Set Up Your OpenAI API Key:

- Unix-based Systems (Linux/macOS):

```bash
export OPENAI_API_KEY=your_openai_api_key
```

- Windows (Command Prompt):

```shell
set OPENAI_API_KEY=your_openai_api_key
```

4. Transcribe and Summarize an Audio File:

```bash
voicely -f /path/to/audio/file.mp3
```

## Installation

For a more detailed setup, including local installation options, see below.

Ensure you have [Node.js](https://nodejs.org/) installed (version 14.x or higher is recommended).

Voicely can be installed globally on your system, allowing you to use it from any directory.

```bash
npm install -g voicely
```

## Environment Setup

To use Voicely, you must provide your OpenAI API key as an environment variable:

- Obtaining the API Key: If you haven't already, get your API key from [OpenAI's API platform](https://platform.openai.com/api-keys). Note that using the OpenAI API may incur costs, so ensure your account has sufficient credits.

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

For advanced usage options and additional flags, see the Usage section below.

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
