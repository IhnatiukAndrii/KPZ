import { TextReader } from './TextReader';
import { SmartTextReader } from './SmartTextReader';

export class SmartTextReaderLocker implements TextReader {
    private reader: SmartTextReader;
    private regex: RegExp;

    constructor(reader: SmartTextReader, regex: RegExp) {
        this.reader = reader;
        this.regex = regex;
    }

    public readText(filePath: string): string[][] {
        if (this.regex.test(filePath)) {
            console.log("Access denied!");
            return [];
        }
        return this.reader.readText(filePath);
    }
}
