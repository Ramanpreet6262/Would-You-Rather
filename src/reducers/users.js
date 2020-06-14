import { GetUser, AddAns, AddQ } from '../actions/users';

export default function users(state = {}, action) {
  switch (action.type) {
    case GetUser:
      return {
        ...state,
        ...action.users
      };
    case AddQ:
      return {
        ...state,
        [action.question.author]: {
          ...state[action.question.author],
          questions: state[action.question.author].questions.concat([
            action.question.id
          ])
        }
      };
    case AddAns:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.questionId]: action.answer
          }
        }
      };
    default:
      return state;
  }
}
