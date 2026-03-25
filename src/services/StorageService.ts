import * as fs from 'fs';
import * as path from 'path';
import { Task } from '../models/Task';
import { Logger } from '../utils/Logger';

export class StorageService {
  private readonly filePath: string;

  constructor(filename: string) {
    this.filePath = path.resolve(process.cwd(), filename);
    this.ensureFileExists();
  }

  private ensureFileExists(): void {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([]), 'utf-8');
    }
  }

  public readData(): Task[] {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      const parsed = JSON.parse(data);
      return parsed.map((item: any) => ({
        ...item,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt)
      }));
    } catch (error: any) {
      Logger.error(`Помилка читання або парсингу файлу: ${error.message}`);
      return [];
    }
  }

  public writeData(data: Task[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }
}
