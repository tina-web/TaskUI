import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Store } from '@ngrx/store';
import * as TaskListPageActions from '../store/task-list-page/actions';
import * as TaskDetailsPageActions from '../store/task-detail-page/actions';

import { MatListModule } from '@angular/material/list';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { Task } from '../interfaces/models';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, MatListModule, MatCheckboxModule, TasksComponent],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  @Input() tasks: Task[] | null = [];
  constructor(private store: Store, private router: Router) { }

  handleCheckboxChange(task: Task, event: MatCheckboxChange): void {
    const updatedTask: Task = { ...task, isCompleted: event.checked };
    this.store.dispatch(TaskListPageActions.updateTask({ id: task.id, task: updatedTask }));
  }

  openTask(task: Task) {
    this.store.dispatch(TaskDetailsPageActions.setTask({ task }))
    this.router.navigateByUrl(`task/${task.id}`)
  }
}
