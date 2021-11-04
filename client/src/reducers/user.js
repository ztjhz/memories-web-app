import { LOGIN } from '../constants/actionTypes';

const userReducer = (
  user = {
    username: '',
    password: '',
    auth: false,
  },
  action
) => {
  switch (action.type) {
    case LOGIN:
      return { ...user, auth: action.payload };
    default:
      return user;
  }
};

export default userReducer;
