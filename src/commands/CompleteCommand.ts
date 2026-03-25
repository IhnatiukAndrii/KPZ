import { Command } from './Command';
import { TaskService } from '../services/TaskService';
import { Logger } from '../utils/Logger';
import { TaskStatus } from '../models/Task';

export class CompleteCommand implements Command {
  public name = 'complete';
  public description = 'Marks a task as DONE. Usage: complete <id>';

  constructor(private taskService: TaskService) {}

  public execute(args: string[]): void {
    if (args.length === 0) {
      Logger.error('Missing ID. Usage: complete <id>');
      return;
    }

    const id = args[0];
    const success = this.taskService.updateTaskStatus(id, TaskStatus.DONE);
    
    if (success) {
      Logger.success(`Task ${id} marked as DONE.`);
    } else {
      Logger.error(`Task ${id} not found.`);
    }
  }
}
