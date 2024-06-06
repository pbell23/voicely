import { SummarizationError } from "./errors.js";

const completionsApiEndpoint = 'https://api.openai.com/v1/chat/completions';

export async function summarizeText(text: string, context: string = ''): Promise<string> {
    const messages = [
        { role: 'system', content: 'You are a helpful assistant tasked with providing a detailed summary with key points, formatted in markdown and in the same language as the original text.' },
    ];

    if (context) {
        messages.push({ role: 'system', content: `Context: ${context}` });
    }

    messages.push({ role: 'user', content: text });

    const payload = {
        model: 'gpt-4-turbo',
        messages,
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
