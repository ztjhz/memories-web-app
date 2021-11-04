import * as api from '../api';

import { LOGIN } from '../constants/actionTypes';

export const login = (userData) => async (dispatch) => {
  try {
    const { data: valid } = await api.login(userData); // returns true or false
    dispatch({ type: LOGIN, payload: valid });
  } catch (error) {
    console.log(error.message);
  }
};
