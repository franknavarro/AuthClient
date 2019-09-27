export const isEmpty = fieldValue => (!fieldValue ? true : false);

export const invalidEmail = email =>
  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export const invalidPassword = (password = '') => {
  const subMessages = [];
  if (password.length < 8 || password.length > 20) {
    subMessages.push('Between 8 and 20 characters');
  }
  if (!/\d/.test(password)) {
    subMessages.push('At least on number');
  }
  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
    subMessages.push('At least one uppercase and lowercase letter');
  }
  if (!/[^A-Za-z0-9 ]/.test(password)) {
    subMessages.push('At least on special character (e.g.!,@,#,$,etc.)');
  }

  if (subMessages.length) {
    return {
      message: 'Password must contain:',
      subMessages,
    };
  } else {
    return false;
  }
};
