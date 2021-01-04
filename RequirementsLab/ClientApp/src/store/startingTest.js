export const STARTING_TEST_BEGIN = 'STARTING_TEST_BEGIN';
export const STARTING_TEST_SUCCESS = 'STARTING_TEST_SUCCESS';
export const STARTING_TEST_ERROR = 'STARTING_TEST_ERROR';
export const NEXT_QUESTION = 'NEXT_QUESTION';

export function startingTest() {
  return dispatch => {
    dispatch(taskListBegin());

    return fetch('/LevelTest/Generate/')
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        dispatch(startingTestSuccess(data));

        return data;
      })
      .catch(error => dispatch(startingTestError(error)));
  };
}

export function nextQuestion() {
  return dispatch => {
    dispatch({
      type: NEXT_QUESTION,
    });
  };
}

export const taskListBegin = () => ({
  type: STARTING_TEST_BEGIN,
});

export const startingTestSuccess = data => ({
  type: STARTING_TEST_SUCCESS,
  payload: data,
});

export const startingTestError = error => ({
  type: STARTING_TEST_ERROR,
  payload: { error },
});

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
}

export const startingTestState = {
  questions: [],
  questionId: 0,
  loading: false,
  error: null,
};

export const startingTestReducer = (state = startingTestState, action) => {
  switch (action.type) {
    case STARTING_TEST_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case STARTING_TEST_SUCCESS:
      return {
        ...state,
        loading: false,
        questions: action.payload.questions,
      };

    case STARTING_TEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        questions: [],
      };

    case NEXT_QUESTION:
      return {
        ...state,
        questionId: state.questionId + 1,
      };

    default:
      return state;
  }
}
