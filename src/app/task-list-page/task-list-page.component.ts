import * as TaskListPageActions from '../store/task-list-page/actions';

import { AddTaskComponent } from '../add-task/add-task.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RootState } from '../store/state';
import { Store } from '@ngrx/store';
import { Task } from '../interfaces/models';
import { TasksComponent } from '../tasks/tasks.component';

@Component({
  selector: 'app-task-list-page',
  standalone: true,
  imports: [CommonModule, TasksComponent, AddTaskComponent],
  templateUrl: './task-list-page.component.html',
  styleUrls: ['./task-list-page.component.scss'],
})
export class TaskListPageComponent {
  taskList$: Observable<Task[]>;

  constructor(private store: Store<RootState>) {
    this.taskList$ = store.select(rootState => rootState.taskListPage.tasks);
  }

  handleAddTask(task: Task): void {
    this.store.dispatch(TaskListPageActions.addTask({task}));
  }
}
