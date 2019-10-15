import React from 'react';
import App from 'next/app';
import AuthProvider from '../components/providers/AuthProvider';
import { getCookie } from '../utils/cookieUtils';

export default class StackOverflowApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    const user = getCookie('appUser');
    if (user) {
      this.setState({ user });
    }
  }

  handleLogin = user => {
    this.setState({
      user: {
        ...user,
      },
    });
  };

  handleLogout = () => {
    this.setState({
      user: null,
    });
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <AuthProvider
        user={this.state.user}
        onLogin={this.handleLogin}
        onLogout={this.handleLogout}
      >
        <Component {...pageProps} />
      </AuthProvider>
    );
  }
}
