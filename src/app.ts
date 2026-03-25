import { StorageService } from './services/StorageService';
import { TaskService } from './services/TaskService';
import { Command } from './commands/Command';
import { AddCommand } from './commands/AddCommand';
import { ListCommand } from './commands/ListCommand';
import { CompleteCommand } from './commands/CompleteCommand';
import { RemoveCommand } from './commands/RemoveCommand';
import { Logger } from './utils/Logger';

export class App {
  private commands: Map<string, Command> = new Map();

  constructor() {
    const storageService = new StorageService('data.json');
    const taskService = new TaskService(storageService);

    this.registerCommand(new AddCommand(taskService));
    this.registerCommand(new ListCommand(taskService));
    this.registerCommand(new CompleteCommand(taskService));
    this.registerCommand(new RemoveCommand(taskService));
  }

  private registerCommand(command: Command): void {
    this.commands.set(command.name, command);
  }

  public run(args: string[]): void {
    if (args.length === 0) {
      this.showHelp();
      return;
    }

    const commandName = args[0];
    const commandArgs = args.slice(1);

    const command = this.commands.get(commandName);

    if (command) {
      command.execute(commandArgs);
    } else {
      Logger.error(`Unknown command: ${commandName}`);
      this.showHelp();
    }
  }

  private showHelp(): void {
    Logger.info('Available commands:');
    this.commands.forEach(command => {
      console.log(`  ${command.name.padEnd(10)} - ${command.description}`);
    });
  }
}
