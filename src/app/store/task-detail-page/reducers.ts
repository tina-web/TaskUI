import * as TaskDetailsPageActions from './actions';

import { createReducer, on } from '@ngrx/store';

import { initialTaskDetailsPageState } from './state';

export const taskDetailsPageStateReducer = createReducer(
  initialTaskDetailsPageState,
  on(TaskDetailsPageActions.setTask, (state, { task }) => ({
    ...state,
    task,
  }))
);
