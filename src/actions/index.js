import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';
import { SubmissionError } from 'redux-form';

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      'http://test.local:3090/signup',
      formProps,
    );

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (e) {
    return Promise.reject(
      new SubmissionError({
        email: { message: 'Email is already in use' },
      }),
    );
    // dispatch({ type: AUTH_ERROR, payload: 'Email is already in use' });
  }
};

export const signout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: '',
  };
};

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      'http://test.local:3090/signin',
      formProps,
    );

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Incorrect username or password' });
    return Promise.reject(
      new SubmissionError({
        _error: 'Incorrect username or password',
      }),
    );
  }
};

export const clearError = () => {
  return {
    type: AUTH_ERROR,
    payload: '',
  };
};
