export class TranscriptionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "TranscriptionError";
    }
}

export class SummarizationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "SummarizationError";
    }
}
