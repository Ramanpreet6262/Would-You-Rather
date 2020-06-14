import { SET_AUTH_USER, LOG_OUT } from './actionTypes';

export function setAuthedUser(id) {
  return {
    type: SET_AUTH_USER,
    id
  };
}

export function logOut() {
  return {
    type: LOG_OUT
  };
}
