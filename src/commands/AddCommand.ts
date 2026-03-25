import { Command } from './Command';
import { TaskService } from '../services/TaskService';
import { Logger } from '../utils/Logger';

export class AddCommand implements Command {
  public name = 'add';
  public description = 'Adds a new task. Usage: add <title> [description]';

  constructor(private taskService: TaskService) {}

  public execute(args: string[]): void {
    if (args.length < 1) {
      Logger.error('Missing title. Usage: add <title> [description]');
      return;
    }
    const title = args[0];
    const description = args.slice(1).join(' ');
    
    const task = this.taskService.addTask(title, description);
    Logger.success(`Task added successfully with ID: ${task.id}`);
  }
}
