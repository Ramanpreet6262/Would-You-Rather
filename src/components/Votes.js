import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  Row,
  Col,
  CardImg,
  Button,
  Progress
} from 'reactstrap';
import { connect } from 'react-redux';
import { handleAddAnswer } from '../actions/shared';
import { Redirect } from 'react-router-dom';
import Error from './Error404/Error404';

class Votes extends Component {
  state = {
    response: null
  };

  handleChange = e => {
    this.setState({ response: e.target.value });
  };

  handleSubmit = () => {
    const { dispatch, authedUser, id } = this.props;
    const { response } = this.state;

    if (response !== null) {
      dispatch(
        handleAddAnswer({
          authedUser,
          questionId: id,
          answer: response
        })
      );
    } else {
      alert('Please select one option');
    }
  };

  render() {
    const { error } = this.props;
    if (error) {
      return (
        <div>
          <Error />
        </div>
      );
    }

    const { authedUser, userName, userImg, question, answ } = this.props;

    let VotesOne = question.optionOne.votes.length;
    let VotesTwo = question.optionTwo.votes.length;
    let colorOne = 'LightGray';
    let colorTwo = 'LightGray';
    let totalVotes = VotesOne + VotesTwo;
    let getAnsBool = false;
    if (answ !== null) {
      getAnsBool = true;
      if (answ === 'optionOne') {
        colorOne = 'rgba(196, 245, 255, 0.5)';
      }
      if (answ === 'optionTwo') {
        colorTwo = 'rgba(196, 245, 255, 0.5)';
      }
    }
    if (!authedUser) return <Redirect to='/login' />;
    return (
      <div>
        <Card className='cardAlign'>
          <CardHeader style={{ marginBottom: '20px' }}>
            <b>{userName} asks:</b>
          </CardHeader>
          <Row>
            <Col sm='3'>
              <CardImg
                style={{ borderRadius: '50%', margin: '20px' }}
                src={userImg}
              ></CardImg>
            </Col>
            <Col sm='1'>
              <div className='divider'></div>
            </Col>
            {!getAnsBool ? (
              <Col>
                <b>Would you rather...</b>
                <br />
                <input
                  onClick={this.handleChange}
                  style={{
                    marginLeft: '50px',
                    marginTop: '20px',
                    marginRight: '20px'
                  }}
                  className='radioo'
                  name='radioo'
                  value='optionOne'
                  type='radio'
                />
                {question.optionOne.text}
                <br />
                <input
                  onClick={this.handleChange}
                  style={{
                    marginLeft: '50px',
                    marginTop: '10px',
                    marginRight: '20px'
                  }}
                  className='radioo'
                  name='radioo'
                  value='optionTwo'
                  type='radio'
                />
                {question.optionTwo.text}

                <Button
                  onClick={this.handleSubmit}
                  style={{ margin: '20px', width: '80%' }}
                  color='primary'
                  block
                >
                  Submit
                </Button>
              </Col>
            ) : (
              <Col>
                <div style={{ marginLeft: '20px' }}>
                  <h3>
                    <b>Results: </b>
                  </h3>
                  <p>Would you rather</p>
                  <Card
                    style={{
                      backgroundColor: colorOne,
                      boxShadow: '3px 3px #888888'
                    }}
                    className='smallCard'
                  >
                    {answ === 'optionOne' ? (
                      <div
                        style={{
                          position: 'absolute',
                          fontSize: 'small',
                          width: '45px',
                          marginLeft: '325px',
                          marginTop: '-45px'
                        }}
                        className='ui red big circular right label'
                      >
                        <p>Your</p>Vote
                      </div>
                    ) : null}
                    <b style={{ margin: '20px' }}>{question.optionOne.text}</b>
                    <center>
                      <Progress
                        color={VotesOne >= VotesTwo ? 'success' : 'warning'}
                        style={{ width: '80%', height: '20px' }}
                        value={VotesOne}
                        max={totalVotes}
                      >
                        {((VotesOne * 100) / totalVotes).toFixed(2)}%
                      </Progress>
                      <b>
                        {VotesOne} Out Of {totalVotes}
                      </b>
                    </center>
                  </Card>
                  <Card
                    style={{
                      backgroundColor: colorTwo,
                      boxShadow: '3px 3px #888888',
                      marginTop: '30px',
                      marginBottom: '20px'
                    }}
                    className='smallCard'
                  >
                    {answ === 'optionTwo' ? (
                      <div
                        style={{
                          position: 'absolute',
                          fontSize: 'small',
                          width: '45px',
                          marginLeft: '325px',
                          marginTop: '-45px'
                        }}
                        className='ui red big circular right label'
                      >
                        <p>Your</p>Vote
                      </div>
                    ) : null}
                    <b style={{ margin: '20px' }}>{question.optionTwo.text}</b>
                    <center>
                      <Progress
                        color={VotesTwo >= VotesOne ? 'success' : 'warning'}
                        style={{ width: '80%', height: '20px' }}
                        value={VotesTwo}
                        max={totalVotes}
                      >
                        {((VotesTwo * 100) / totalVotes).toFixed(2)}%
                      </Progress>
                      <b>
                        {VotesTwo} Out Of {totalVotes}
                      </b>
                    </center>
                  </Card>
                </div>
              </Col>
            )}
          </Row>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, { match }) {
  const QuestionId = match.params.question_id;

  if (questions[QuestionId] === undefined) {
    const error = true;
    return {
      error
    };
  }

  const userName = users[questions[QuestionId].author].name;
  const question = questions[QuestionId];

  let answ = '';

  if (question.optionOne.votes.includes(authedUser)) {
    answ = 'optionOne';
  } else if (question.optionTwo.votes.includes(authedUser)) {
    answ = 'optionTwo';
  } else {
    answ = null;
  }

  const userImg = users[question.author].avatarURL;
  const error = false;

  return {
    id: QuestionId,
    question,
    answ,
    authedUser,
    userName,
    userImg,
    error
  };
}

export default connect(mapStateToProps)(Votes);
