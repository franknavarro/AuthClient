import React from 'react';

export default props => {
  const isPassword = props.input.name === 'password' ? 'password' : undefined;
  const type = props.type || isPassword || 'text';
  return (
    <div className="field">
      <div className="ui left icon input">
        <i className={`${props.icon} icon`} />
        <input
          {...props.input}
          type={type}
          placeholder={props.placeholder}
          autoComplete={props.autoComplete}
        />
      </div>
    </div>
  );
};
