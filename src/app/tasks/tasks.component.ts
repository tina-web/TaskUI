import { Component, Input } from '@angular/core';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';

import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { Task } from '../interfaces/models';
import { updateTask } from '../store/task-list-page/actions';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, MatListModule, MatCheckboxModule, TasksComponent],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  @Input() tasks: Task[] | null = [];

  constructor(private store: Store) {}

  handleCheckboxChange(task: Task, event: MatCheckboxChange): void {
    const updatedTask: Task = { ...task, isCompleted: event.checked };
    this.store.dispatch(updateTask({ id: task.id, task: updatedTask }));
  }
}
