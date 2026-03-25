import { Logger } from './Logger';
import { FileWriter } from './FileWriter';
import { FileLoggerAdapter } from './FileLoggerAdapter';

function main() {
    const consoleLogger = new Logger();
    consoleLogger.Log("Console log message");
    consoleLogger.Warn("Console warning message");
    consoleLogger.Error("Console error message");

    const fileWriter = new FileWriter("log.txt");
    const fileLogger = new FileLoggerAdapter(fileWriter);

    fileLogger.Log("File log message");
    fileLogger.Warn("File warning message");
    fileLogger.Error("File error message");
}

main();
