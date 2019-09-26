import React from 'react';
import { Field } from 'redux-form';

export default props => {
  return (
    <div className="field">
      <div className="ui left icon input">
        <i className={`${props.icon} icon`} />
        <Field {...props} />
      </div>
    </div>
  );
};
