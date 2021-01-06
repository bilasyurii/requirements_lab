export const ADD_REQUIREMENT = 'ADD_REQUIREMENT';
export const DELETE_REQUIREMENT = 'DELETE_REQUIREMENT';
export const UPDATE_REQUIREMENT = 'UPDATE_REQUIREMENT';
export const CLEAR_REQUIREMENTS = 'CLEAR_REQUIREMENTS';

export function addRequirement(requirement) {
  return dispatch => {
    dispatch({
      type: ADD_REQUIREMENT,
      payload: { requirement },
    });
  };
}

export function deleteRequirement(id) {
  return dispatch => {
    dispatch({
      type: DELETE_REQUIREMENT,
      payload: { id },
    });
  };
}

export function clearRequirements() {
  return dispatch => {
    dispatch({
      type: CLEAR_REQUIREMENTS,
    });
  };
}

export const requirementsTaskState = {
  requirements: [],
};

function copyArray(arr) {
  const newArr = [];

  arr.forEach(x => newArr.push(x));

  return newArr;
}

export const requirementsTaskReducer = (state = requirementsTaskState, action) => {
  switch (action.type) {
    case ADD_REQUIREMENT:
      {
        const requirements = copyArray(state.requirements)
  
        requirements.push(action.payload.requirement);
  
        requirements.forEach((requirement, index) => requirement.id = index);
        
        return {
          ...state,
          requirements,
        };
      }
      
    case DELETE_REQUIREMENT:
      {
        let requirements = copyArray(state.requirements)

        const id = action.payload.id;

        requirements = requirements.filter((requirement) => requirement.id !== id);

        requirements.forEach((requirement, index) => requirement.id = index);
        
        return {
          ...state,
          requirements,
        };
      }

    case CLEAR_REQUIREMENTS:
      return {
        ...state,
        requirements: [],
      };

    default:
      return state;
  }
}
