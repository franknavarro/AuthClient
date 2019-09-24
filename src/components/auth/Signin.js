import React from 'react';
import SignForm from './SignForm';
import { connect } from 'react-redux';
import { signin } from '../../actions';

const Signin = props => {
  return <SignForm {...props} buttonName="Sign In" />;
};

export default connect(
  null,
  { onSubmit: signin },
)(Signin);
