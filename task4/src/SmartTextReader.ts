import * as fs from 'fs';
import { TextReader } from './TextReader';

export class SmartTextReader implements TextReader {
    public readText(filePath: string): string[][] {
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n');
        
        const result: string[][] = [];
        for (const line of lines) {
            result.push(line.split(''));
        }
        
        return result;
    }
}
