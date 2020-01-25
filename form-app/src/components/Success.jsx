import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

class Success extends Component {
  state = {};
  render() {
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Success" />
          <h1>Than You For Your Submission! </h1>
          <p>You will get am email with further instruction.</p>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default Success;
