import { Command } from './Command';
import { TaskService } from '../services/TaskService';
import { Logger } from '../utils/Logger';

export class ListCommand implements Command {
  public name = 'list';
  public description = 'Lists all tasks';

  constructor(private taskService: TaskService) {}

  public execute(): void {
    const tasks = this.taskService.getTasks();
    if (tasks.length === 0) {
      Logger.info('No tasks found.');
      return;
    }

    tasks.forEach(task => {
      const statusColor = task.status === 'DONE' ? '\x1b[32m' : task.status === 'IN_PROGRESS' ? '\x1b[33m' : '\x1b[31m';
      console.log(`[${statusColor}${task.status}\x1b[0m] ${task.title} (${task.id})`);
      if (task.description) {
        console.log(`    ${task.description}`);
      }
    });
  }
}
