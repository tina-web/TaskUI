import { Injectable } from '@angular/core';
import { Task } from '../interfaces/models';

@Injectable({
  providedIn: 'root',
})
export class TaskRepositoryService {
  #localStorageKey = 'TASKS';

  getTasks(): Task[] {
    const tasksString: string = localStorage.getItem(this.#localStorageKey);
    return JSON.parse(tasksString) as Task[];
  }

  saveTasks(tasks: Task[]): void {
    const taskListJson: string = JSON.stringify(tasks);
    localStorage.setItem(this.#localStorageKey, taskListJson);
  }

  getTask(id: string): Task | undefined {
    return this.getTasks().find(task => task.id === id);
  }

  saveTask(task: Task): void {
    const tasks = this.getTasks();
    const index = tasks.findIndex(existingTask => existingTask.id === task.id);
    if (index >= 0) {
      tasks.splice(index, 1, task);
    }
    this.saveTasks(tasks);
  }
}
