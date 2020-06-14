import { ADD_ANS, ADD_Q, GET_Q } from '../actions/actionTypes';

export default function questions(state = {}, action) {
  switch (action.type) {
    case GET_Q:
      return {
        ...state,
        ...action.questions
      };
    case ADD_Q:
      return {
        ...state,
        [action.question.id]: action.question
      };
    case ADD_ANS:
      return {
        ...state,
        [action.questionId]: {
          ...state[action.questionId],
          [action.answer]: {
            ...state[action.questionId][action.answer],
            votes: state[action.questionId][action.answer].votes.concat([
              action.authedUser
            ])
          }
        }
      };

    default:
      return state;
  }
}
