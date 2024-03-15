import { createAction, props } from '@ngrx/store';

import { Task } from '../../interfaces/models';

const taskDetailPageActionSource = 'TaskDetailsPage';

export const setTask = createAction(`[${taskDetailPageActionSource}] Set Task`, props<{ task: Task }>());
