import React from 'react';
import AuthContext from './../../context/AuthContext';

export function withAuthContext(Component) {
  return function WrapperComponent(props) {
    return (
      <AuthContext.Consumer>
        {({ user, onLogin, onLogout }) => (
          <Component
            {...props}
            user={user}
            onLogin={onLogin}
            onLogout={onLogout}
          />
        )}
      </AuthContext.Consumer>
    );
  };
}
