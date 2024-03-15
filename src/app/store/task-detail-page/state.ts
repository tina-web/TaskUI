import { Task } from '../../interfaces/models';

export interface TaskDetailsPageState {
  task: Task;
}

export const initialTaskDetailsPageState: TaskDetailsPageState = {
  task: new Task(''),
};
