import { taskListReducer } from './taskList';

export const reducers = {
  taskList: taskListReducer,
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void): void;
}
