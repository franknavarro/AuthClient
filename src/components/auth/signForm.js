import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  reduxForm,
  getFormMeta,
  getFormSyncErrors,
  getFormSubmitErrors,
} from 'redux-form';
import { clearError } from '../../actions';

export default (ChildComponent, { onSubmit, name, validate }) => {
  class ComposedComponent extends Component {
    onSubmit = formProps => {
      return this.props.onSubmit(formProps, () => {
        this.props.history.push('/feature');
      });
    };

    componentWillUnmount() {
      this.props.clearError();
    }

    renderSubMessages(subMessages) {
      return (
        <ul className="list">
          {subMessages.map((subMessage, index) => {
            return <li key={index}>{subMessage}</li>;
          })}
        </ul>
      );
    }

    renderErrorMessage() {
      const formErrors = {
        ...this.props.formErrors,
        ...this.props.submitErrors,
      };
      const errorEntries = Object.entries(formErrors);
      const formMetas = this.props.formMetas;

      const showErrors = [];
      errorEntries.forEach(([fieldName, { message, subMessages }]) => {
        const meta = formMetas[fieldName];
        if (message && meta && meta.touched) {
          showErrors.push({ message, fieldName, subMessages });
        }
      });

      if (showErrors.length || this.props.error) {
        return (
          <div className="ui error message">
            {this.props.error && <p>{this.props.error}</p>}
            <ul className="list">
              {showErrors.map(({ message, fieldName, subMessages }) => {
                return (
                  <li key={fieldName}>
                    {message}
                    {subMessages && this.renderSubMessages(subMessages)}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      }

      return null;
    }

    render() {
      const { handleSubmit } = this.props;
      return (
        <div className="ui middle aligned center aligned grid">
          <div className="column" style={{ maxWidth: '500px' }}>
            <form
              onSubmit={handleSubmit(this.onSubmit)}
              className="ui large form error"
            >
              <div className="ui stacked segment">
                <ChildComponent {...this.props} />
                <button className="ui fluid button primary">{name}</button>
              </div>
              {this.renderErrorMessage()}
            </form>
          </div>
        </div>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      errorMessage: state.auth.errorMessage,
      formMetas: getFormMeta(name)(state),
      formErrors: getFormSyncErrors(name)(state),
      submitErrors: getFormSubmitErrors(name)(state),
    };
  };

  return compose(
    connect(
      mapStateToProps,
      { onSubmit, clearError },
    ),
    reduxForm({ form: name, validate }),
  )(ComposedComponent);
};
