import { createAction, props } from '@ngrx/store';

import { Task } from '../../interfaces/models';

const taskDetailPageActionSource = 'TaskDetailsPage';

export const setTasks = createAction(`[${taskDetailPageActionSource}] Set Tasks`, props<{ tasks: Task[] }>());

export const addTask = createAction(`[${taskDetailPageActionSource}] Add Task`, props<{ task: Task }>());
export const updateTask = createAction(`[${taskDetailPageActionSource}] Update Task`, props<{ id: string; task: Task }>());
