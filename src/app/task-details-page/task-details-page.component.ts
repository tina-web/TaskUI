import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subscription, map } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { Store } from '@ngrx/store';
import { RootState } from '../store/state';
import * as TaskListPageActions from '../store/task-list-page/actions';
import * as TaskDetailsPageActions from '../store/task-detail-page/actions';

import { TaskRepositoryService } from '../services/task-repository.service';
import { Task } from '../interfaces/models';

@Component({
  selector: 'app-task-details-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatCheckboxModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task-details-page.component.html',
  styleUrls: ['./task-details-page.component.scss']
})
export class TaskDetailsPageComponent implements OnInit, OnDestroy {
  task: Task | undefined
  localeDate: string | undefined
  editMode = false
  formTitle = new FormControl('')
  formContent = new FormControl('')
  routeParamId: Observable<string>
  subscriptions: Subscription[] = []

  constructor(private route: ActivatedRoute, private taskRepositoryService: TaskRepositoryService, private store: Store<RootState>, private router: Router) {
    this.routeParamId = route.params.pipe(map((param) => param['id']));
  }

  ngOnInit() {
    this.setTask()
    if (this.task) {
      this.localeDate = new Date(this.task.createdDate).toLocaleString()
      this.formTitle = new FormControl(this.task.title)
      this.formContent = new FormControl(this.task.content)
    }
  }

  setTask() {
    // If the task's id is not equal the one in the route param, it is likely because there is no task stored (e.g when acessing the url directly or refreshing page/localStorage). 
    // This is because the initial state of task is a new-randomly generated task (see task-detail-page/state.ts). 
    // So in the case we can not acsess the actual current task from the store, we retreive it by calling the service directly with routeParamId; then store it accordingly

    const storedTask = this.store.select(rootState => rootState.taskDetailsPage.task)

    this.subscriptions.push(this.routeParamId.subscribe(paramId => {
      this.subscriptions.push(storedTask.subscribe(task => {
        if (task.id !== paramId) {
          this.task = this.taskRepositoryService.getTask(paramId)
          this.store.dispatch(TaskDetailsPageActions.setTask({ task }))
        } else {
          this.task = task
        }
      }))
    }))
  }

  handleCheckboxChange(task: Task | undefined, event: MatCheckboxChange): void {
    if (task) {
      const updatedTask = { ...task, isCompleted: event.checked }
      this.store.dispatch(TaskListPageActions.updateTask({ id: task.id, task: updatedTask }))
      this.store.dispatch(TaskDetailsPageActions.setTask({ task: updatedTask }))
    }
  }

  saveTask() {
    const formTitle = this.formTitle?.value
    const formContent = this.formContent?.value

    if (this.task, formTitle, formContent !== undefined) {
      const updatedTask = { ...this.task, title: formTitle, content: formContent } as Task
      this.store.dispatch(TaskListPageActions.updateTask({ id: updatedTask.id, task: updatedTask }))
      this.store.dispatch(TaskDetailsPageActions.setTask({ task: updatedTask }))
    }
    this.editMode = false
  }

  openAllTasks() {
    this.router.navigateByUrl('')
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
