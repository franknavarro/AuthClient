import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { clearError } from '../../actions';

import SignField from './SignField';

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
      <div className="ui middle aligned center aligned grid">
        <div className="column">
          <form
            onSubmit={handleSubmit(this.onSubmit)}
            className="ui large form error"
          >
            <div className="ui stacked segment">
              <SignField
                name="email"
                type="text"
                component="input"
                autoComplete="none"
                placeholder="Email address"
                icon="user"
              />
              <SignField
                name="password"
                type="password"
                component="input"
                autoComplete="none"
                placeholder="Password"
                icon="lock"
              />
              <button className="ui fluid button primary">
                {this.props.buttonName}
              </button>
            </div>
            {this.renderErrorMessage()}
          </form>
        </div>
      </div>
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
