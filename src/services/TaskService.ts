import { Task, TaskStatus } from '../models/Task';
import { IStorageService } from './StorageService';
import * as crypto from 'crypto';

export class TaskService {
  private tasks: Task[];

  constructor(private storageService: IStorageService) {
    this.tasks = this.storageService.readData();
  }

  public getTasks(): Task[] {
    return [...this.tasks];
  }

  public getTaskById(id: string): Task | undefined {
    return this.tasks.find(t => t.id === id);
  }

  public addTask(title: string, description: string): Task {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      status: TaskStatus.TODO,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.tasks.push(newTask);
    this.storageService.writeData(this.tasks);
    return newTask;
  }

  public updateTaskStatus(id: string, status: TaskStatus): boolean {
    const task = this.getTaskById(id);
    if (!task) {
      return false;
    }
    task.status = status;
    task.updatedAt = new Date();
    this.storageService.writeData(this.tasks);
    return true;
  }

  public removeTask(id: string): boolean {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter(t => t.id !== id);
    if (this.tasks.length !== initialLength) {
      this.storageService.writeData(this.tasks);
      return true;
    }
    return false;
  }
}
