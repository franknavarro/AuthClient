import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { clearError } from '../../actions';

export default (ChildComponent, { onSubmit, name }) => {
  class ComposedComponent extends Component {
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
    return { errorMessage: state.auth.errorMessage };
  };

  return compose(
    connect(
      mapStateToProps,
      { onSubmit, clearError },
    ),
    reduxForm({ form: name }),
  )(ComposedComponent);
};
