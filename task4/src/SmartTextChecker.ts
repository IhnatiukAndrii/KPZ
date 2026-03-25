import { TextReader } from './TextReader';
import { SmartTextReader } from './SmartTextReader';

export class SmartTextChecker implements TextReader {
    private reader: SmartTextReader;

    constructor(reader: SmartTextReader) {
        this.reader = reader;
    }

    public readText(filePath: string): string[][] {
        console.log(`Opening file: ${filePath}`);
        
        try {
            const result = this.reader.readText(filePath);
            console.log(`Successfully read file: ${filePath}`);
            
            const totalLines = result.length;
            let totalChars = 0;
            for (const line of result) {
                totalChars += line.length;
            }
            
            console.log(`Total lines: ${totalLines}`);
            console.log(`Total characters: ${totalChars}`);
            
            console.log(`Closing file: ${filePath}`);
            return result;
        } catch (error) {
            console.log(`Failed to read file: ${filePath}`);
            return [];
        }
    }
}
