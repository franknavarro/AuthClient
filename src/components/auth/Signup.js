import React from 'react';
import { Field } from 'redux-form';

import { signup } from '../../actions';
import signForm from './signForm';
import SignField from './SignField';
import { isEmpty, invalidEmail, invalidPassword } from '../../validation';

const Signup = props => {
  return (
    <>
      <Field
        name="name"
        component={SignField}
        autoComplete="off"
        placeholder="Full Name"
        icon="user"
      />
      <Field
        name="email"
        component={SignField}
        autoComplete="off"
        placeholder="Email address"
        icon="envelope"
      />
      <Field
        name="password"
        type="password"
        component={SignField}
        autoComplete="off"
        placeholder="Password"
        icon="lock"
      />
    </>
  );
};

const validate = ({ name, email, password }) => {
  const errors = {};
  if (isEmpty(name)) {
    errors.name = { message: 'Please enter your name' };
  }
  if (isEmpty(email)) {
    errors.email = { message: 'Please enter your email' };
  } else if (invalidEmail(email)) {
    errors.email = { message: 'Please enter a valid email address' };
  }
  const notPassword = invalidPassword(password);
  if (notPassword) {
    errors.password = notPassword;
  }

  return errors;
};

export default signForm(Signup, {
  name: 'Sign Up',
  onSubmit: signup,
  validate,
});
