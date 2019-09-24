import React from 'react';
import SignForm from './SignForm';
import { connect } from 'react-redux';
import { signup } from '../../actions';

const Signup = props => {
  return <SignForm {...props} buttonName="Sign Up" />;
};

export default connect(
  null,
  { onSubmit: signup },
)(Signup);
