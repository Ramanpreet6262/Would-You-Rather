import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  Row,
  Col,
  CardImg,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Button
} from 'reactstrap';
import { setAuthedUser } from '../actions/authedUser';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  state = {
    userId: null,
    userName: null,
    showBtnDropDown: false
  };

  handleChange = (id, name) => {
    this.setState({ userId: id, userName: name });
  };

  handleLogin = () => {
    const { dispatch } = this.props;
    if (this.state.userId !== null) {
      dispatch(setAuthedUser(this.state.userId));
    } else {
      alert('Please select a user');
    }
  };

  render() {
    const { authedUser, users } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if (authedUser !== null) {
      return <Redirect to={from} />;
    }
    return (
      <div className='cardAlign'>
        <Card>
          <center>
            <CardHeader>
              <b>Welcome to Would You Rather Game</b>
              <p>Please sign in to continue.</p>
            </CardHeader>
            <Row>
              <Col>
                <h3 style={{ color: 'green' }}>Select existing user</h3>
              </Col>
            </Row>
            <Row>
              {Object.keys(users).map((user, indx) => {
                return (
                  <Col key={indx} sm='2'>
                    <CardImg
                      style={{
                        borderRadius: '50%',
                        margin: '20px',
                        marginLeft: '125px'
                      }}
                      src={users[user].avatarURL}
                    ></CardImg>
                  </Col>
                );
              })}
            </Row>
            <Row>
              <Col>
                <center>
                  <h3 className='blue'>Sign In</h3>
                </center>
              </Col>
            </Row>
            <Row>
              <Col>
                <Dropdown
                  size='lg'
                  isOpen={this.state.showBtnDropDown}
                  toggle={() => {
                    this.setState({
                      showBtnDropDown: !this.state.showBtnDropDown
                    });
                  }}
                >
                  {this.state.userName ? (
                    <DropdownToggle
                      ref={this.selectt}
                      color='danger'
                      style={{ width: '450px', marginTop: '20px' }}
                      caret
                    >
                      {this.state.userName}
                    </DropdownToggle>
                  ) : (
                    <DropdownToggle
                      color='danger'
                      style={{ width: '450px', marginTop: '20px' }}
                      caret
                    >
                      Please select a user
                    </DropdownToggle>
                  )}

                  <DropdownMenu
                    modifiers={{
                      setMaxHeight: {
                        enabled: true,
                        order: 890,
                        fn: data => {
                          return {
                            ...data,
                            styles: {
                              ...data.styles,
                              overflow: 'auto',
                              maxHeight: '100px',
                              width: '450px'
                            }
                          };
                        }
                      }
                    }}
                  >
                    {Object.keys(users).map((user, indx) => {
                      return (
                        <DropdownItem
                          key={indx}
                          onClick={e => {
                            this.handleChange(users[user].id, users[user].name);
                          }}
                        >
                          <Row>
                            <Col>
                              <img
                                style={{ borderRadius: '50%', height: '40px' }}
                                src={users[user].avatarURL}
                                alt={users[user].id + '.jpg'}
                              />
                            </Col>
                            <Col sm='10'>
                              <p style={{ marginTop: '10px' }}>
                                {users[user].name}
                              </p>
                            </Col>
                          </Row>
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </Dropdown>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  onClick={this.handleLogin}
                  color='primary'
                  size='lg'
                  style={{
                    width: '450px',
                    marginTop: '20px',
                    marginBottom: '20px'
                  }}
                  block
                >
                  Sign In
                </Button>
              </Col>
            </Row>
          </center>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users
  };
}

export default connect(mapStateToProps)(Login);
