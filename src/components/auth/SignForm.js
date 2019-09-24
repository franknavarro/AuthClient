import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { clearError } from '../../actions';

class SignForm extends Component {
  onSubmit = formProps => {
    this.props.onSubmit(formProps, () => {
      this.props.history.push('/feature');
    });
  };

  componentWillUnmount() {
    this.props.clearError();
  }

  renderErrorMessage() {
    if (this.props.errorMessage) {
      return (
        <div className="ui error message">
          <p>{this.props.errorMessage}</p>
        </div>
      );
    }

    return null;
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)} className="ui form error">
        <div className="field">
          <label>Email</label>
          <Field
            name="email"
            type="text"
            component="input"
            autoComplete="none"
          />
        </div>
        <div className="field">
          <label>Password</label>
          <Field
            name="password"
            type="password"
            component="input"
            autoComplete="none"
          />
        </div>
        {this.renderErrorMessage()}
        <button className="ui button primary">{this.props.buttonName}</button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return { errorMessage: state.auth.errorMessage };
};

export default compose(
  connect(
    mapStateToProps,
    { clearError },
  ),
  reduxForm({ form: 'signin' }),
)(SignForm);
