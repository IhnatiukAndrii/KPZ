import * as fs from 'fs';

export class FileWriter {
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    public Write(text: string): void {
        fs.appendFileSync(this.filePath, text);
    }

    public WriteLine(text: string): void {
        fs.appendFileSync(this.filePath, text + '\n');
    }
}
