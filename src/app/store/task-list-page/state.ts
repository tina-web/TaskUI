import { Task } from '../../interfaces/models';

export interface TaskListPageState {
  tasks: Task[];
}

export const initialTaskListPageState: TaskListPageState = {
  tasks: [],
};
