import { getInitialData } from '../utils/_DATA';
import { getUsers } from './users';
import { getQuestions } from './questions';
import { showLoading, hideLoading } from 'react-redux-loading';
import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA';
import { ADD_Q, ADD_ANS } from './actionTypes';

function addQuestion(question) {
  return {
    type: ADD_Q,
    question
  };
}

function addAnswer({ authedUser, questionId, answer }) {
  return {
    type: ADD_ANS,
    authedUser,
    questionId,
    answer
  };
}

export function handleAddQuestion({
  optionOneText,
  optionTwoText,
  authedUser
}) {
  return dispatch => {
    dispatch(showLoading());
    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    })
      .then(question => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()));
  };
}

export function handleAddAnswer({ authedUser, questionId, answer }) {
  return dispatch => {
    dispatch(showLoading());
    dispatch(
      addAnswer({
        authedUser: authedUser,
        questionId: questionId,
        answer: answer
      })
    );
    return _saveQuestionAnswer({
      authedUser: authedUser,
      qid: questionId,
      answer: answer
    }).then(() => dispatch(hideLoading()));
  };
}

export function handleInitialData() {
  return dispatch => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(getUsers(users));
      dispatch(getQuestions(questions));
      dispatch(hideLoading());
    });
  };
}
