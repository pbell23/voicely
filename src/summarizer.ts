import { SummarizationError } from "./errors.js";

const completionsApiEndpoint = 'https://api.openai.com/v1/chat/completions';

export async function summarizeText(text: string): Promise<string> {
    const payload = {
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: 'You are a helpful assistant tasked with providing a detailed summary with key points, formatted in markdown.' },
            { role: 'user', content: text },
        ],
    };

    try {
        const response = await fetch(completionsApiEndpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json() as any;
        return data.choices[0].message.content || "";
    } catch (error: any) {
        if (error instanceof SummarizationError) {
            throw error;
        }
        throw new SummarizationError(`Unexpected error during summarization: ${error.message}`);
    }
}
