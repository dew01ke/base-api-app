export interface SerializedException {
    message: string;
    code: string;
    stack?: string;
    cause?: string;
    metadata?: unknown;
}

export abstract class ExceptionBase extends Error {
    public code: string;

    protected constructor(
        public readonly message: string,
        private cause?: Error,
        private metadata?: unknown,
    ) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
    }

    public toJSON(): SerializedException {
        return {
            message: this.message,
            code: this.code,
            stack: this.stack,
            cause: JSON.stringify(this.cause),
            metadata: this.metadata,
        };
    }
}
