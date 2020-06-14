import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';
import Cardd from './questionCard';

class Home extends Component {
  state = {
    quesType: true
  };

  handleTab = val => {
    this.setState({ quesType: val });
  };

  render() {
    const { authedUser, unansweredQuestions, answeredQuestions } = this.props;

    if (!authedUser) {
      return <Redirect to='/login' />;
    }

    return (
      <div>
        <div
          className='questions_list'
          style={{ align: 'center', width: '900px' }}
        >
          <Row style={{ justifyContent: 'center' }}>
            <Row style={{ margin: '20px' }}>
              <Col sm='6'>
                <center>
                  <Button
                    active={this.state.quesType}
                    outline
                    color='primary'
                    onClick={e => {
                      this.handleTab(true);
                    }}
                    style={{ align: 'center', width: '300px' }}
                  >
                    UnAnswered
                  </Button>{' '}
                </center>
              </Col>
              <Col sm='6'>
                <center>
                  <Button
                    active={!this.state.quesType}
                    outline
                    color='primary'
                    onClick={e => {
                      this.handleTab(false);
                    }}
                    style={{ align: 'center', width: '300px' }}
                  >
                    Answered
                  </Button>{' '}
                </center>
              </Col>
            </Row>

            {this.state.quesType ? (
              unansweredQuestions.length === 0 ? (
                <h2 style={{ color: 'green', marginTop: '30px' }}>
                  You have answered all the questions
                </h2>
              ) : (
                unansweredQuestions.map((id, indx) => (
                  <Cardd key={indx} id={id} />
                ))
              )
            ) : answeredQuestions.length === 0 ? (
              <h2 style={{ color: 'yellow', marginTop: '30px' }}>
                You have not answered any of the questions yet
              </h2>
            ) : (
              answeredQuestions.map((id, indx) => <Cardd key={indx} id={id} />)
            )}
          </Row>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions }) {
  const unansweredQuestions = Object.keys(questions)
    .filter(
      id =>
        !questions[id].optionOne.votes.includes(authedUser) &&
        !questions[id].optionTwo.votes.includes(authedUser)
    )
    .sort((x, y) => questions[y].timestamp - questions[x].timestamp);
  const answeredQuestions = Object.keys(questions)
    .filter(
      id =>
        questions[id].optionOne.votes.includes(authedUser) ||
        questions[id].optionTwo.votes.includes(authedUser)
    )
    .sort((x, y) => questions[y].timestamp - questions[x].timestamp);
  return {
    authedUser,
    unansweredQuestions,
    answeredQuestions
  };
}
export default connect(mapStateToProps)(Home);
