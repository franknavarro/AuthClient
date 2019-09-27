import React, { Component } from 'react';
import requireAuth from './auth/requireAuth';

class Feature extends Component {
  render() {
    return (
      <div>
        Welcome user! You have successfully created an account and are signed
        in!
      </div>
    );
  }
}

export default requireAuth(Feature);
