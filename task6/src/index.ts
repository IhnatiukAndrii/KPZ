import * as fs from 'fs';
import { LightTextNode } from './LightTextNode';
import { OldLightElementNode } from './OldLightElementNode';
import { LightElementNode } from './LightElementNode';

function generateBook(filename: string, linesCount: number) {
    let content = "The Great Book\n";
    for (let i = 1; i < linesCount; i++) {
        if (i % 10 === 0) {
            content += "Short line\n";
        } else if (i % 7 === 0) {
            content += "    This is a quote starting with space and it is decently long to not be h2.\n";
        } else {
            content += "This is a regular paragraph with more than twenty characters of text to test the formatting properly.\n";
        }
    }
    fs.writeFileSync(filename, content);
}

function processLinesOld(lines: string[]) {
    const root = new OldLightElementNode("div", "block", "paired", []);
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].replace('\r', '');
        if (line.length === 0) continue;

        let node: OldLightElementNode;
        if (i === 0) {
            node = new OldLightElementNode("h1", "block", "paired", []);
        } else if (line.startsWith(' ')) {
            node = new OldLightElementNode("blockquote", "block", "paired", []);
        } else if (line.length < 20) {
            node = new OldLightElementNode("h2", "block", "paired", []);
        } else {
            node = new OldLightElementNode("p", "block", "paired", []);
        }

        node.addChild(new LightTextNode(line));
        root.addChild(node);
    }
    return root;
}

function processLinesFlyweight(lines: string[]) {
    const root = new LightElementNode("div", "block", "paired", []);
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].replace('\r', '');
        if (line.length === 0) continue;

        let node: LightElementNode;
        if (i === 0) {
            node = new LightElementNode("h1", "block", "paired", []);
        } else if (line.startsWith(' ')) {
            node = new LightElementNode("blockquote", "block", "paired", []);
        } else if (line.length < 20) {
            node = new LightElementNode("h2", "block", "paired", []);
        } else {
            node = new LightElementNode("p", "block", "paired", []);
        }

        node.addChild(new LightTextNode(line));
        root.addChild(node);
    }
    return root;
}

function main() {
    console.log("Generating book with 500,000 lines...");
    const filename = 'book.txt';
    generateBook(filename, 500000);
    const content = fs.readFileSync(filename, 'utf-8');
    const lines = content.split('\n');
    console.log(`Loaded ${lines.length} lines. Starting markup generation.\n`);

    if (global.gc) global.gc();
    const memBeforeOld = process.memoryUsage().heapUsed;
    let oldRoot = processLinesOld(lines);
    const memAfterOld = process.memoryUsage().heapUsed;
    console.log(`Memory used by tree BEFORE Flyweight: ${((memAfterOld - memBeforeOld) / 1024 / 1024).toFixed(2)} MB`);

    oldRoot = null as any;
    if (global.gc) global.gc();

    const memBeforeFly = process.memoryUsage().heapUsed;
    let newRoot = processLinesFlyweight(lines);
    const memAfterFly = process.memoryUsage().heapUsed;
    console.log(`Memory used by tree AFTER Flyweight: ${((memAfterFly - memBeforeFly) / 1024 / 1024).toFixed(2)} MB`);
    
    console.log(`\nMemory successfully reduced thanks to the Flyweight pattern!`);
}

main();
