import { GET_Q } from './actionTypes';

export function getQuestions(questions) {
  return {
    type: GET_Q,
    questions
  };
}
