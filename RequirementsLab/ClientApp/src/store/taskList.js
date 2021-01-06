import { handleErrors } from "../utils/httpUtils";

export const TASK_LIST_BEGIN = 'TASK_LIST_BEGIN';
export const TASK_LIST_SUCCESS = 'TASK_LIST_SUCCESS';
export const TASK_LIST_ERROR = 'TASK_LIST_ERROR';

export function taskList() {
  return dispatch => {
    dispatch(taskListBegin());

    return fetch('/Task/GetTasks/')
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        dispatch(taskListSuccess(data));

        return data;
      })
      .catch(error => dispatch(taskListError(error)));
  };
}

export const taskListBegin = () => ({
  type: TASK_LIST_BEGIN,
});

export const taskListSuccess = data => ({
  type: TASK_LIST_SUCCESS,
  payload: data,
});

export const taskListError = error => ({
  type: TASK_LIST_ERROR,
  payload: { error },
});

export const taskListState = {
  taskList: [],
  taskTypes: [],
  loading: false,
  error: null,
};

export const taskListReducer = (state = taskListState, action) => {
  switch (action.type) {
    case TASK_LIST_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case TASK_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        taskList: action.payload.tasks,
        taskTypes: action.payload.taskTypes,
      };

    case TASK_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        taskList: [],
        taskTypes: [],
      };

    default:
      return state;
  }
}
