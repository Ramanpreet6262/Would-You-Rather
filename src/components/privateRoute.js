import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth === true ? (
        <Component {...props} />
      ) : (
        <div>
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location.pathname }
            }}
          />
          {/* {alert('Please Sign In First')} */}
        </div>
      )
    }
  />
);

export default PrivateRoute;
