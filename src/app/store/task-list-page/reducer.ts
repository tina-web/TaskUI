import * as TaskListPageActions from './actions';

import { createReducer, on } from '@ngrx/store';

import { initialTaskListPageState } from './state';

export const taskListPageReducer = createReducer(
  { ...initialTaskListPageState },
  on(TaskListPageActions.setTasks, (state, { tasks }) => ({
    ...state,
    tasks,
  })),
  on(TaskListPageActions.addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
  })),
  on(TaskListPageActions.updateTask, (state, { id, task }) => {
    const index = state.tasks.findIndex(task => task.id === id);
    if (index >= 0) {
      const updatedTasks = [...state.tasks];
      updatedTasks.splice(index, 1, task);
      return {
        ...state,
        tasks: updatedTasks,
      };
    }
    return state;
  })
);
