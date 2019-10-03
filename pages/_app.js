import React from 'react';
import App from 'next/app';
import AuthProvider from "../components/providers/AuthProvider";

export default class StackOverflowApp extends App {

  componentDidMount() {

  }

  handleLogin = (user) => {
    console.log('Handling Login....');
    this.setState({
      user: {
        ...user
      }
    });
  };

handleLogout = () => {
  this.setState({
    user: null
  });
};

  render() {

    const {Component, pageProps} = this.props;
    return (
      <AuthProvider
            user={this.state.user}
            onLogin={this.handleLogin}
            onLogout={this.handleLogout}>

        <Component {...pageProps}/>
      </AuthProvider>
    );
  }
}
