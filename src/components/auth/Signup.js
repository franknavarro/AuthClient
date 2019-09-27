import React from 'react';
import { Field } from 'redux-form';

import { signup } from '../../actions';
import signForm from './signForm';
import SignField from './SignField';

const Signin = props => {
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

export default signForm(Signin, { name: 'Sign Up', onSubmit: signup });
