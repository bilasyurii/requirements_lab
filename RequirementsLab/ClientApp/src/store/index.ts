import { taskListReducer } from './taskList';
import { startingTestReducer } from './startingTest';

export const reducers = {
  taskList: taskListReducer,
  startingTest: startingTestReducer,
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void): void;
}
