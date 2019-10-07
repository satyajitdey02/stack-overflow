import React from 'react';
import withAuthContext from './hoc/withAuthContext';

const Authentication = props => {
  const { user, onLogin, onLogout } = props;

  return (
    <React.Fragment>
      {user && user.userName ? (
        <a href="#" onClick={onLogoutClick}>
          Logout
        </a>
      ) : (
        <a href="#" onClick={onLoginClick}>
          Login
        </a>
      )}
    </React.Fragment>
  );
};

export default withAuthContext(Authentication);
