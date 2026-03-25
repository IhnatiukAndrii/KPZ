import * as readline from 'readline';
import { GeneralInfoHandler } from './GeneralInfoHandler';
import { BillingHandler } from './BillingHandler';
import { TechSupportHandler } from './TechSupportHandler';
import { OperatorHandler } from './OperatorHandler';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query: string): Promise<string> {
    return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
    const generalInfo = new GeneralInfoHandler();
    const billing = new BillingHandler();
    const techSupport = new TechSupportHandler();
    const operator = new OperatorHandler();

    generalInfo.setNext(billing).setNext(techSupport).setNext(operator);

    let resolved = false;

    while (!resolved) {
        console.log("\n--- Support Menu ---");
        console.log("1: General Information");
        console.log("2: Billing & Payments");
        console.log("3: Technical Support");
        console.log("4: Speak to an Operator");
        console.log("Any other key: Listen to options again");
        
        const answer = await askQuestion("Please enter your choice (1-4): ");
        const result = generalInfo.handle(answer.trim());

        if (result !== null) {
            console.log(`\nResponse: ${result}`);
            resolved = true;
        } else {
            console.log("\nResponse: Invalid choice. Repeating menu...");
        }
    }

    rl.close();
}

main();
