import * as TaskListPageActions from './actions';

import { Actions, ROOT_EFFECTS_INIT, createEffect, ofType } from '@ngrx/effects';

import { Injectable } from '@angular/core';
import { TaskRepositoryService } from 'src/app/services/task-repository.service';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { RootState } from '../state';
import { Store } from '@ngrx/store';
import { merge } from 'rxjs';

@Injectable()
export class TaskListPageEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() => {
        const tasks = this.taskRepositoryService.getTasks();
        return TaskListPageActions.setTasks({ tasks });
      })
    )
  );

  saveCurrentTasks$ = createEffect(() =>
    merge(this.actions$.pipe(ofType(TaskListPageActions.addTask)), this.actions$.pipe(ofType(TaskListPageActions.updateTask))).pipe(
      withLatestFrom(this.store.select(rootState => rootState.taskListPage.tasks)),
      // eslint-disable-next-line no-empty-pattern
      tap(([{}, tasks]) => {
        this.taskRepositoryService.saveTasks(tasks);
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<RootState>,
    private taskRepositoryService: TaskRepositoryService
  ) {}
}
