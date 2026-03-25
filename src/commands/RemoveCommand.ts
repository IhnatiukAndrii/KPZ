import { Command } from './Command';
import { TaskService } from '../services/TaskService';
import { Logger } from '../utils/Logger';

export class RemoveCommand implements Command {
  public name = 'remove';
  public description = 'Removes a task. Usage: remove <id>';

  constructor(private taskService: TaskService) {}

  public execute(args: string[]): void {
    if (args.length === 0) {
      Logger.error('Missing ID. Usage: remove <id>');
      return;
    }

    const id = args[0];
    const success = this.taskService.removeTask(id);
    
    if (success) {
      Logger.success(`Task ${id} removed.`);
    } else {
      Logger.error(`Task ${id} not found.`);
    }
  }
}
