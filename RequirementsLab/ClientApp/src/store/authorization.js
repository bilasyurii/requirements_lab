﻿import { handleErrors, postData } from "../utils/httpUtils";

export const LOGIN_BEGIN = 'LOGIN_BEGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_BEGIN = 'LOGOUT_BEGIN';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';
export const REGISTER_BEGIN = 'REGISTER_BEGIN';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const OPEN_LOGIN = 'OPEN_LOGIN';
export const OPEN_REGISTER = 'OPEN_REGISTER';

export function login(data) {
  return dispatch => {
    dispatch(loginBegin());

    const json = JSON.stringify(data);

    return postData('/Account/Login/', json)
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        dispatch(loginSuccess(data));

        return data;
      })
      .catch(error => dispatch(loginError(error)));
  };
}

export const loginBegin = () => ({
  type: LOGIN_BEGIN,
});

export const loginSuccess = data => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginError = error => ({
  type: LOGIN_ERROR,
  payload: { error },
});

export function logout() {
  return dispatch => {
    dispatch(logoutBegin());

    return fetch('/Account/Logout/')
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        dispatch(logoutSuccess(data));

        return data;
      })
      .catch(error => dispatch(logoutError(error)));
  };
}

export const logoutBegin = () => ({
  type: LOGOUT_BEGIN,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutError = error => ({
  type: LOGOUT_ERROR,
  payload: { error },
});

export function register(data) {
  return dispatch => {
    dispatch(registerBegin());

    const json = JSON.stringify(data);

    return postData('/Account/Register/', json)
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        dispatch(registerSuccess(data));

        return data;
      })
      .catch(error => dispatch(registerError(error)));
  };
}

export function openLogin() {
  return dispatch => {
    dispatch({
      type: OPEN_LOGIN,
    });
  };
}

export function openRegister() {
  return dispatch => {
    dispatch({
      type: OPEN_REGISTER,
    });
  };
}

export const registerBegin = () => ({
  type: REGISTER_BEGIN,
});

export const registerSuccess = data => ({
  type: REGISTER_SUCCESS,
  payload: data,
});

export const registerError = error => ({
  type: REGISTER_ERROR,
  payload: { error },
});

export const authorizationState = {
  loggedIn: false,
  userId: null,
  error: null,
  loading: false,
  isRegistering: false,
};

export const authorizationReducer = (state = authorizationState, action) => {
  switch (action.type) {
    case REGISTER_BEGIN:
    case LOGIN_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        userId: action.payload.userId,
      };

    case REGISTER_ERROR:
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case LOGOUT_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        userId: null,
      };

    case LOGOUT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case OPEN_LOGIN:
      return {
        ...state,
        isRegistering: false,
      };

    case OPEN_REGISTER:
      return {
        ...state,
        isRegistering: true,
      };

    default:
      return state;
  }
}