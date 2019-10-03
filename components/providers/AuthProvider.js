import React, {Component} from 'react';
import AuthContext from './../../context/AuthContext';

export default class AuthProvider extends Component {

  render() {
    return (
        <AuthContext.Provider
            value={{
              user: this.props.user,
              onLogin: this.props.onLogin,
              onLogout: this.props.onLogout
            }}>
          {this.props.children}
        </AuthContext.Provider>
    );
  }
}