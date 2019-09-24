import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      'http://test.local:3090/signup',
      formProps,
    );

    dispatch({ type: AUTH_USER, payload: response.data.token });
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
  }
};