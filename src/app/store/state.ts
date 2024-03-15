import { TaskDetailsPageState, initialTaskDetailsPageState } from './task-detail-page/state';
import { TaskListPageState, initialTaskListPageState } from './task-list-page/state';

export interface RootState {
  taskListPage: TaskListPageState;
  taskDetailsPage: TaskDetailsPageState;
}

export const initialRootState: RootState = {
  taskListPage: { ...initialTaskListPageState },
  taskDetailsPage: { ...initialTaskDetailsPageState },
};
