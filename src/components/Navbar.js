import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem, NavbarToggler, Collapse, Navbar } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { logOut } from '../actions/authedUser';

class Navbarr extends Component {
  state = {
    isOpen: false
  };

  toggleNavbar = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleLogout = e => {
    e.preventDefault();
    if (this.props.authedUser) this.props.dispatch(logOut());
  };

  render() {
    const { userName, userImg, authedUser } = this.props;
    return (
      <Navbar color='light' light expand='md'>
        <NavbarToggler onClick={this.toggleNavbar} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className='mr-auto' navbar>
            <NavItem>
              <NavLink
                exact
                activeClassName='active'
                style={{ textDecoration: 'none' }}
                to='/'
              >
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                activeClassName='active'
                style={{ textDecoration: 'none' }}
                to='/add'
              >
                New Question
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                activeClassName='active'
                style={{ textDecoration: 'none' }}
                to='/leaderboard'
              >
                LeaderBoard
              </NavLink>
            </NavItem>
          </Nav>
          {authedUser && (
            <NavItem>
              Hello, {userName}
              <img
                style={{ height: '30px', borderRadius: '50%' }}
                src={userImg}
                alt='error'
              />
              <NavLink
                onClick={this.handleLogout}
                style={{ textDecoration: 'none' }}
                to='/login'
              >
                LogOut
              </NavLink>
            </NavItem>
          )}
        </Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    userName: authedUser && users[authedUser].name,
    userImg: authedUser && users[authedUser].avatarURL
  };
}

export default connect(mapStateToProps)(Navbarr);
