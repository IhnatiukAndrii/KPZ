import * as fs from 'fs';
import { SmartTextReader } from './SmartTextReader';
import { SmartTextChecker } from './SmartTextChecker';
import { SmartTextReaderLocker } from './SmartTextReaderLocker';

function main() {
    fs.writeFileSync('test.txt', 'Hello World!\nThis is a test file.');
    fs.writeFileSync('secret_test.txt', 'This is a secret file.\nDo not read.');
    
    console.log("--- SmartTextReader ---");
    const reader = new SmartTextReader();
    const data0 = reader.readText('test.txt');
    console.log(`Read ${data0.length} lines`);

    console.log("\n--- SmartTextChecker ---");
    const checker = new SmartTextChecker(reader);
    checker.readText('test.txt');

    console.log("\n--- SmartTextReaderLocker ---");
    const restrictedRegex = new RegExp('secret_');
    const locker = new SmartTextReaderLocker(reader, restrictedRegex);

    console.log("Trying test.txt:");
    const data1 = locker.readText('test.txt');
    console.log(`Read ${data1.length} lines`);

    console.log("\nTrying secret_test.txt:");
    locker.readText('secret_test.txt');
}

main();
