import { taskListReducer } from './taskList';
import { startingTestReducer } from './startingTest';
import { requirementsTaskReducer } from './requirementsTask';

export const reducers = {
  taskList: taskListReducer,
  startingTest: startingTestReducer,
  requirementsTask: requirementsTaskReducer,
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void): void;
}
