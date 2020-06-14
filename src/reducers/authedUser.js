import { LOG_OUT, SET_AUTH_USER } from '../actions/actionTypes';

export default function authUser(state = null, action) {
  switch (action.type) {
    case SET_AUTH_USER:
      return action.id;
    case LOG_OUT:
      return null;
    default:
      return state;
  }
}
