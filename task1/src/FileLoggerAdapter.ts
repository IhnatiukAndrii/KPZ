import { FileWriter } from './FileWriter';
import { ILogger } from './Logger';

export class FileLoggerAdapter implements ILogger {
    private fileWriter: FileWriter;

    constructor(fileWriter: FileWriter) {
        this.fileWriter = fileWriter;
    }

    public Log(message: string): void {
        this.fileWriter.WriteLine(`[LOG]: ${message}`);
    }

    public Error(message: string): void {
        this.fileWriter.WriteLine(`[ERROR]: ${message}`);
    }

    public Warn(message: string): void {
        this.fileWriter.WriteLine(`[WARN]: ${message}`);
    }
}
