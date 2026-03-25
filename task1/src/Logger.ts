export interface ILogger {
    Log(message: string): void;
    Error(message: string): void;
    Warn(message: string): void;
}

export class Logger implements ILogger {
    public Log(message: string): void {
        console.log(`\x1b[32m${message}\x1b[0m`);
    }

    public Error(message: string): void {
        console.error(`\x1b[31m${message}\x1b[0m`);
    }

    public Warn(message: string): void {
        console.warn(`\x1b[33m${message}\x1b[0m`);
    }
}
